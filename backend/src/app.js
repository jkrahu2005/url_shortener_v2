const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// const authRouter = require("./routes/auth.routes");
// const urlRouter = require("./routes/url.routes");
// const redirectRouter = require("./routes/redirect.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
];

app.use(
    cors({
        origin(origin, callback) {
            // Allow Postman / curl
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error("Not allowed by CORS")
            );
        },
        credentials: true,
    })
);

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
// app.use("/auth", authRouter);
// app.use("/url", urlRouter);
// // Public Redirect Route
// app.use("/", redirectRouter);

module.exports = app;