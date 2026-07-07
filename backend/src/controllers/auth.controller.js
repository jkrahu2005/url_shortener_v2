const authService = require("../services/auth.service");

const {
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
} = require("../utils/cookieOptions");

/**
 * Register Controller
 */
async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        const {
            user,
            accessToken,
            refreshToken,
        } = await authService.register(
            name,
            email,
            password
        );

        // Access Token Cookie
        res.cookie(
            "accessToken",
            accessToken,
            accessTokenCookieOptions
        );

        // Refresh Token Cookie
        res.cookie(
            "refreshToken",
            refreshToken,
            refreshTokenCookieOptions
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
            },
        });

    } catch (err) {

        console.error("Register Controller Error:", err.message);

        return res.status(400).json({
            success: false,
            message: err.message,
        });

    }
}
/**
 * Login Controller
 */
async function login(req, res) {
    try {
        const { email, password } = req.body;

        const {
            user,
            accessToken,
            refreshToken,
        } = await authService.login(
            email,
            password
        );

        // Set Access Token Cookie
        res.cookie(
            "accessToken",
            accessToken,
            accessTokenCookieOptions
        );

        // Set Refresh Token Cookie
        res.cookie(
            "refreshToken",
            refreshToken,
            refreshTokenCookieOptions
        );

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
            },
        });

    } catch (err) {

        console.error("Login Controller Error:", err.message);

        return res.status(401).json({
            success: false,
            message: err.message,
        });

    }
}
/**
 * Refresh Access Token Controller
 */
async function refresh(req, res) {
    try {
        // console.log("Refresh endpoint hit");
        // console.log("Cookies:", req.cookies);
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token not found.",
            });
        }

        const {
            accessToken,
            refreshToken: newRefreshToken,
        } = await authService.refresh(refreshToken);

        // Set new Access Token
        res.cookie(
            "accessToken",
            accessToken,
            accessTokenCookieOptions
        );

        // Set new Refresh Token
        res.cookie(
            "refreshToken",
            newRefreshToken,
            refreshTokenCookieOptions
        );

        return res.status(200).json({
            success: true,
            message: "Tokens refreshed successfully.",
        });

    } catch (err) {
        // console.log("Refresh failed:", err.message);
        console.error(
            "Refresh Controller Error:",
            err.message
        );

        // ✅ Clear invalid cookies
        res.clearCookie(
            "accessToken",
            accessTokenCookieOptions
        );

        res.clearCookie(
            "refreshToken",
            refreshTokenCookieOptions
        );

        return res.status(401).json({
            success: false,
            message: err.message,
        });
    }
}
/**
 * Logout Controller
 */
/**
 * Logout Controller
 */
async function logout(req, res) {

    try {

        const accessToken =
            req.cookies.accessToken;

        const refreshToken =
            req.cookies.refreshToken;

        await authService.logout(
            accessToken,
            refreshToken
        );

        res.clearCookie("accessToken");

        res.clearCookie("refreshToken");

        return res.status(200).json({
            success: true,
            message: "Logged out successfully.",
        });

    } catch (err) {

        console.error(
            "Logout Controller Error:",
            err.message
        );

        return res.status(500).json({
            success: false,
            message: "Logout failed.",
        });
    }
}
/**
 * Current Logged-in User
 */
async function getCurrentUser(req, res) {
    try {

        return res.status(200).json({
            success: true,
            user: {
                id: req.user.id,
                fullName: req.user.full_name,
                email: req.user.email,
            },
        });

    } catch (err) {

        console.error(
            "Get Current User Error:",
            err.message
        );

        return res.status(500).json({
            success: false,
            message: "Something went wrong.",
        });
    }
}

module.exports = {
    register,
    login,
    refresh,
    logout,
    getCurrentUser
};