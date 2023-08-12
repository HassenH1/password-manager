"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorize = (credentials = []) => {
    // module.exports = (credentials = []) => {
    return (req, res, next) => {
        // Allow for string or Array
        if (typeof credentials === "string") {
            credentials = [credentials];
        }
        // API Processing
        // Find JWT token in headers
        const tokenHeader = req.headers["authorization"];
        console.log(tokenHeader, "<==========tokenHeader");
        // Browser Processing
        // Find JWT token in cookies
        const tokenPayloadCookie = req.cookies["_h_p"];
        const tokenSignatureCookie = req.cookies["_s"];
        console.log(tokenPayloadCookie, "<======tokenPayloadCookie");
        console.log(tokenSignatureCookie, "<=======tokenSignatureCookie");
        let tokenStr = null;
        if (tokenPayloadCookie && tokenSignatureCookie) {
            // Cookie processing
            // Assemble 2 cookies then validate
            tokenStr = `${tokenPayloadCookie}.${tokenSignatureCookie}`;
        }
        else if (tokenHeader) {
            // Header Processing
            // Bearer yhju7uyu...
            const arrayHeader = tokenHeader.split(" ");
            if (arrayHeader[0] !== "Bearer") {
                // Invalid token type error. Token should be a 'Bearer' Token
                return res.status(401).send("Access Denied: Invalid Token");
            }
            else {
                tokenStr = arrayHeader[1];
            }
        }
        else {
            return res.status(401).send("Access Denied: Invalid Credentials");
        }
        // Check if we have something to validate
        if (!tokenStr) {
            return res.status(401).send("Access Denied");
        }
        else {
            // Validate JWT
            jsonwebtoken_1.default.verify(tokenStr, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err)
                    return res.status(401).send("Error: Access Denied");
                // Reset Payload Cookie expiration time
                res.cookie("_h_p", tokenPayloadCookie, {
                    maxAge: 1000 * 60 * 30,
                    sameSite: true,
                    // secure: true // TODO: Set to true when not on localhost
                });
                if (credentials.length > 0) {
                    if (decoded.scopes &&
                        decoded.scopes.length &&
                        credentials.some((cred) => decoded.scopes.indexOf(cred) >= 0)) {
                        next();
                    }
                    else {
                        return res
                            .status(401)
                            .send("Error: Access Denied, no credentials");
                    }
                }
                else {
                    console.log("no credentials required for route, just authentication");
                    // User is authenticated and there are no credentials to check for authorization
                    next();
                }
            });
        }
    };
};
exports.default = authorize;
