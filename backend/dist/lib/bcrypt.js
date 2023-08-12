"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bcrypt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Bcrypt {
    constructor() {
        this.saltRound = 8;
    }
    hash(password) {
        return bcryptjs_1.default.hashSync(password, this.saltRound);
    }
    comparePasswords(password1, password2) {
        return bcryptjs_1.default.compareSync(password1, password2);
    }
}
exports.Bcrypt = Bcrypt;
