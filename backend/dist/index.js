"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("./database/connection");
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const credentials_1 = __importDefault(require("./routes/credentials"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authorization_1 = __importDefault(require("./middleware/authorization"));
require("dotenv/config");
connection_1.db.connection();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN,
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/auth", user_1.default);
app.use("/credentials", credentials_1.default);
//random string generator
// console.log(require('crypto').randomBytes(256).toString('base64'));
/**
 * @todo need to remove this
 */
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server is running!");
});
/**
 * @todo need to remove this
 */
app.get("/dashboard", (0, authorization_1.default)(), (req, res) => {
    res.send("dashboard route with authorizer");
});
/**
 * @todo need to remove this
 */
app.post("/post", (0, authorization_1.default)(), (req, res) => {
    const { name } = req.body;
    res.send(`your name is ${name}`);
});
app.use((err, req, res, next) => {
    res.header("Content-Type", "application/json");
    const buildErrorMessage = {
        success: err.success || false,
        message: err.message || "",
        data: null,
    };
    res.status(err.status || 500).json(buildErrorMessage);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
