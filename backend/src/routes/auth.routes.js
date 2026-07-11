const express = require("express");
const passport = require("../config/passport.config");

const authController = require("../controllers/auth.controller");
const { authenticate } = require("../middleware/auth.middleware");

const authRouter = express.Router();

// ✅ Regular Auth Routes (Your existing routes - unchanged)
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);
authRouter.get("/me", authenticate, authController.getCurrentUser);

// ✅ Google OAuth Routes (FIXED - removed /auth from the path)
authRouter.get(
    "/google",  // ⬅️ CHANGED from "/auth/google" to "/google"
    passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
    "/google/callback",  // ⬅️ CHANGED from "/auth/google/callback" to "/google/callback"
    passport.authenticate("google", { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login` }),
    authController.googleCallback
);

module.exports = authRouter;