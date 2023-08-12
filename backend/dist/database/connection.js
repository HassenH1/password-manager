"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
class Connection {
    // need this for singleton design pattern
    constructor() {
        this.uri = process.env.MONGO_CONNECTION_URL;
    }
    // get the only object available
    static getInstance() {
        return Connection.instance;
    }
    connection() {
        mongoose_1.default.connect(this.uri);
        mongoose_1.default.connection.on("connected", () => {
            console.log(`Mongoose connected!!!`);
        });
        mongoose_1.default.connection.on("disconnected", () => {
            console.log("Mongoose disconnected");
        });
        mongoose_1.default.connection.on("error", (err) => {
            console.log("Mongoose error :( ", err);
        });
    }
}
// private uri: string = "mongodb://127.0.0.1:27017/password-generator";
// private uri: string = "mongodb://localhost/password-generator";
Connection.instance = new Connection();
exports.db = Connection.getInstance();
