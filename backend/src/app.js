const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session"); // ✅ NEW - Required for OAuth state parameter
const passport = require("./config/passport.config"); // ✅ NEW - Google OAuth config

const authRouter = require("./routes/auth.routes");
const urlRouter = require("./routes/url.routes");
const redirectRouter = require("./routes/redirect.routes");

const app = express();

// ==================== MIDDLEWARE ====================

app.use(express.json());
app.use(cookieParser());

// ✅ Session Middleware (Used ONLY to store the temporary OAuth state parameter)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your-super-secret-session-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production", // Set true for HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        },
    })
);

// ✅ Initialize Passport (Registers the Google Strategy)
app.use(passport.initialize());
// ❌ NO passport.session() - We use JWT tokens, not server-side sessions!

// ==================== CORS ====================

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
];

app.use(
    cors({
        origin(origin, callback) {
            // Allow Postman / curl (no origin)
            if (!origin) {
                return callback(null, true);
            }
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

// ==================== ROUTES ====================

app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "OK",
        message: "Server is healthy",
        timestamp: new Date().toISOString(),
    });
});

app.use("/auth", authRouter);
app.use("/url", urlRouter);
// Public Redirect Route
app.use("/", redirectRouter);

module.exports = app;