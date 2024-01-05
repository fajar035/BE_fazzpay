const jwt = require("jsonwebtoken");

function getJWT(payload, duration) {
  if (!duration) duration = "1d";

  const jwtOptions = {
    expiresIn: duration,
    issuer: process.env.JWT_ISSUER,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 4;
};

module.exports = { validateEmail, validatePassword, getJWT };
