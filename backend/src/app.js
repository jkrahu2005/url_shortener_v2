console.log("1");

const express = require("express");
console.log("2");

const cors = require("cors");
console.log("3");

const cookieParser = require("cookie-parser");
console.log("4");

console.log("Loading auth...");
const authRouter = require("./routes/auth.routes");
console.log("Auth loaded");

console.log("Loading url...");
const urlRouter = require("./routes/url.routes");
console.log("URL loaded");

console.log("Loading redirect...");
const redirectRouter = require("./routes/redirect.routes");
console.log("Redirect loaded");

const app = express();
console.log("App created");

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Backend Running");
});

console.log("Exporting app");

module.exports = app;