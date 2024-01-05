const response = require("../helpers/response");
const repository = require("../repository/account");
const { getJWT, validateEmail, validatePassword } = require("./utility");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email / password tidak boleh kosong");
    if (!validateEmail(email)) throw new Error("Harap masukan email yang benar");
    if (!validatePassword(password)) throw new Error("Harap masukan password yang benar,  minimal 5 karakter");

    const account = await repository.createAccount(email, password);

    response.success(res, 200, { email: account.email, message: "Berhasil register" });
  } catch (err) {
    response.error(res, 400, err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email / password tidak boleh kosong");

    const account = await repository.getAccountByUsernamePassword(email, password);
    if (account === null) throw new Error("Email / Password salah");

    response.success(res, 200, { token: getJWT(account) });
  } catch (err) {
    response.error(res, 401, err);
  }
};

const logout = async (req, res) => {
  try {
    if (!req.headers.authorization) return res.status(401).json({ message: "Unauthorized" });
    const token = req.headers.authorization.split(" ")[1];
    await repository.createBlacklistToken(token);
  } catch (err) {
    response.error(res, 401, err);
  }
};

const addPin = async (req, res) => {
  response.success(res, 200, { pin: req.headers });
};

module.exports = { register, login, logout, addPin };
