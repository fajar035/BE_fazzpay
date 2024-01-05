const { database } = require("./utility");
const bcrypt = require("bcryptjs");

async function getAccountByEmail(email) {
  const statement = `SELECT * FROM account WHERE email = ?`;

  const [rows] = await database.promise().query(statement, [email]);
  console.log("ROWS : ", rows);

  if (rows.length === 0) return null;

  return rows[0];
}

async function getAccountByUsernamePassword(email, password) {
  const statement = `SELECT * FROM account WHERE email = ?`;

  const [rows] = await database.promise().query(statement, [email]);

  if (rows.length < 1) return null;

  const account = rows[0];
  const hash = account.password;

  const isMatch = bcrypt.compareSync(password, hash);
  if (!isMatch) return null;

  return {
    id: account.id,
    email: account.email,
  };
}

async function createAccount(email, password) {
  const account = await getAccountByEmail(email);
  if (account) throw new Error("Email sudah terdaftar");

  const statement = `INSERT INTO account SET ?`;
  const hash = bcrypt.hashSync(password, 10);

  const model = {
    email,
    password: hash,
  };

  database.promise().query(statement, [model]);

  return await getAccountByEmail(email);
}

async function getTokenFromBlacklist(token) {
  const statement = `SELECT token FROM blacklist WHERE token = ?`;
  const [rows] = await database.promise().query(statement, [token]);
  return rows;
}

async function createBlacklistToken(token) {
  const statement = `INSERT INTO blacklist SET ?`;

  const [rows] = await database.promise().query(statement, [{ token }]);
  console.log("ROWS LOGOUT : ", rows);
}

module.exports = {
  getAccountByUsernamePassword,
  createAccount,
  getAccountByEmail,
  getTokenFromBlacklist,
  createBlacklistToken,
};
