"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
    // private secret: string = process.env.TOKEN_SECRET
    generateAccessToken(key) {
        //read these articles to understand why i split the token
        //https://stackoverflow.com/questions/48983708/where-to-store-access-token-in-react-js
        //https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3
        //https://github.com/brian-childress/jwt-2-cookie-auth
        console.log(process.env.TOKEN_SECRET, "<----------token secret!");
        try {
            const token = jsonwebtoken_1.default.sign(key, process.env.TOKEN_SECRET, {
                algorithm: "HS256",
                // expiresIn: "3000s", //30 minutes
            });
            console.log(token, "<---------------token is this?");
            if (token) {
                return token.split(".");
            }
        }
        catch (error) {
            throw error;
        }
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // I need to finish this
            }
        });
    }
}
const jwtService = new JWT();
exports.default = jwtService;
