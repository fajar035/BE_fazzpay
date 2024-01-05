const mysql = require("mysql2");

const database = mysql.createPool({
  connectionLimit: 1,

  host: process.env.HOST,
  user: process.env.UNAME,
  password: process.env.PASS,
  database: process.env.DB,
});

module.exports = { database };
