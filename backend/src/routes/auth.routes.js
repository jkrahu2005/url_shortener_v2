const express = require("express");

const authController = require("../controllers/auth.controller");

const authRouter = express.Router();
const {
    authenticate,
} = require("../middleware/auth.middleware");

authRouter.post("/register", authController.register);

authRouter.post("/login", authController.login);

authRouter.post("/refresh", authController.refresh);
authRouter.post( "/logout", authController.logout);
authRouter.get(
    "/me",
    authenticate,
    authController.getCurrentUser
);

module.exports = authRouter;