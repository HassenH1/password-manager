"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = __importDefault(require("../database/models"));
const bcrypt_1 = require("../lib/bcrypt");
const jwt_1 = __importDefault(require("../lib/jwt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authValidation_1 = require("../middleware/authValidation");
const router = (0, express_1.Router)();
const userModel = models_1.default.schema();
const Users = userModel.Users;
const crypt = new bcrypt_1.Bcrypt();
router.post("/signup", (0, authValidation_1.signUpValidationRules)(), authValidation_1.validate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cryptedPassword = crypt.hash(req.body.password);
        const createdUser = yield Users.create(Object.assign(Object.assign({}, req.body), { password: cryptedPassword }));
        const savedUser = yield createdUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: savedUser,
        });
    }
    catch (err) {
        if (err.message.includes("to be unique"))
            err.status = 400;
        next(err);
    }
}));
router.post("/login", (0, authValidation_1.loginValidationRules)(), authValidation_1.validate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const findUser = yield Users.findOne({ email }).orFail();
        if (!crypt.comparePasswords(password, findUser.password))
            throw new Error("Password doesn't match");
        const token = jwt_1.default.generateAccessToken({
            _id: findUser._id,
            email: findUser.email,
        });
        if (token && token.length > 0) {
            res.cookie("_h_p", `${token[0]}.${token[1]}`, {
                maxAge: 1000 * 60 * 30,
                sameSite: true,
            });
            res.cookie("_s", token[2], {
                httpOnly: true,
                sameSite: true,
            });
            res.status(200).send({
                access_token: token,
                success: true,
                message: "User logged in successfully",
                data: findUser,
                // access_token: token,
            });
        }
    }
    catch (error) {
        if (error.message.includes("No document found") ||
            error.message.includes("Password doesn't match")) {
            error.message = "Email/password doesn't match";
            error.status = 401;
        }
        next(error);
    }
}));
router.get("/check-token", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).send({ success: false, message: "Unauthorized" });
    }
    else {
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err) => {
            if (err) {
                res.status(401).send({ success: false, message: "Unauthorized" });
            }
            else {
                res.status(200).send({ success: true, message: "Authorized" });
            }
        });
    }
});
router.get("/logout", (req, res) => {
    res.clearCookie("_h_p");
    res.clearCookie("_s");
    res.status(204).send({
        success: true,
        message: "User logged out successfully",
        data: null,
    });
});
exports.default = router;
