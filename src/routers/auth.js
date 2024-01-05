const express = require("express");
const authController = require("../handler/auth");
const { verifyToken } = require("../middlewares/verifyToken");

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.delete("/logout", verifyToken, authController.logout);
authRouter.post("/pin/add", verifyToken, authController.addPin);

module.exports = authRouter;
