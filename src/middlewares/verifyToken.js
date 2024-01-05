const jwt = require("jsonwebtoken");
const { getTokenFromBlacklist } = require("../repository/account");

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ message: "Unauthorized" });
  const token = req.headers.authorization.split(" ")[1];
  const checkToken = await getTokenFromBlacklist(token);

  if (checkToken.length !== 0) return res.status(401).json({ message: "Login dulu" });

  next();
};

module.exports = { verifyToken };
