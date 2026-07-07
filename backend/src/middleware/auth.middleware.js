const userModel = require("../models/user.model");

const { verifyAccessToken } = require("../utils/jwt");

const {
    isTokenBlacklisted,
} = require("../utils/redis");

async function authenticate(req, res, next) {
    try {
         console.log(1);
        // Read Access Token
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Access token not found.",
            });
        }

        // Verify JWT
        const payload = verifyAccessToken(accessToken);

        // Check Redis Blacklist
        const blacklisted = await isTokenBlacklisted(
            payload.jti
        );

        if (blacklisted) {
            return res.status(401).json({
                success: false,
                message: "Access token has been revoked.",
            });
        }

        // Check User
        const user = await userModel.findUserById(
            payload.id
        );

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        // Attach User
        req.user = user;

        next();

    } catch (err) {

    console.error(
        "Authentication Middleware Error:",
        err.message
    );

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Access token expired.",
        });
    }

    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            success: false,
            message: "Invalid access token.",
        });
    }

    return res.status(401).json({
        success: false,
        message: "Authentication failed.",
    });
}
}

module.exports = {
    authenticate,
};