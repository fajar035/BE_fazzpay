const express = require("express");
const authRouter = require("./auth");
const routers = express.Router();

routers.use("/auth", authRouter);

routers.get("/", (_, res) => {
  res.status(200).json({
    status: 200,
    message: "Welcome to API Fazzpay",
  });
});

module.exports = routers;
