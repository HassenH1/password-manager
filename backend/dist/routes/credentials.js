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
const authorization_1 = __importDefault(require("../middleware/authorization"));
const credentialValidation_1 = require("../middleware/credentialValidation");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
const model = models_1.default.schema();
const credentials = model.Credential;
const bCrypt = new bcrypt_1.Bcrypt();
const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+={}[]|:;/?.>,<";
router.post("/create-credentials", (0, authorization_1.default)(), (0, credentialValidation_1.createCredentialValidationRules)(), credentialValidation_1.validate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cryptedPassword = bCrypt.hash(req.body.password);
        const createdCredentials = yield credentials.create(Object.assign(Object.assign({}, req.body), { password: cryptedPassword }));
        const savedCredentials = yield createdCredentials.save();
        res.status(201).json({
            success: true,
            message: "Created credentials successfully",
            data: savedCredentials,
        });
    }
    catch (error) {
        if (error.message.includes("duplicate key error collection"))
            error.status = 400;
        if (error.message.includes("BSONTypeError"))
            error.status = 404;
        next(error);
    }
}));
router.get("/get-all-credentials/:userId", (0, authorization_1.default)(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllCredentialsForUser = yield credentials.aggregate([
            { $match: { userId: new mongoose_1.default.Types.ObjectId(req.params.userId) } },
        ]);
        if (!getAllCredentialsForUser)
            throw new Error("Not found");
        res.status(200).json({
            success: true,
            message: "Credentials for user retrieved successfully",
            data: getAllCredentialsForUser,
        });
    }
    catch (error) {
        if (error.message === "Not found")
            error.status = 404;
        next(error);
    }
}));
router.get("/get-single-credential/:id/:userId", (0, authorization_1.default)(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, userId } = req.params;
        const getSingleCredentialsForUser = yield credentials.findOne({
            _id: id,
            userId: userId,
        });
        if (!getSingleCredentialsForUser)
            throw new Error("Not found");
        res.status(200).json({
            success: true,
            message: "Retrieved single credential successfully",
            data: getSingleCredentialsForUser,
        });
    }
    catch (error) {
        if (error.message === "Not found")
            error.status = 404;
        next(error);
    }
}));
router.patch("/patch-credentials/:id/:userId", (0, authorization_1.default)(), (0, credentialValidation_1.patchCredentialValidationRules)(), credentialValidation_1.validate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, userId } = req.params;
        if (req.body.password) {
            const patchedPassword = bCrypt.hash(req.body.password);
            req.body.password = patchedPassword;
        }
        const patchedCredential = yield credentials.findOneAndUpdate({ _id: id, userId }, req.body, { new: true });
        if (!patchedCredential)
            throw new Error("Not found");
        res.status(201).json({
            success: true,
            message: "Patched credential successfully",
            data: patchedCredential,
        });
    }
    catch (error) {
        if (error.message.includes("Not found"))
            error.status = 404;
        next(error);
    }
}));
router.delete("/remove-credentials/:id/:userId", (0, authorization_1.default)(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, userId } = req.params;
        const removeSingleCredentialsForUser = yield credentials.deleteOne({
            _id: id,
            userId: userId,
        });
        if (removeSingleCredentialsForUser.acknowledged &&
            removeSingleCredentialsForUser.deletedCount == 0)
            throw new Error("Not found");
        res.status(200).json({
            success: true,
            message: "Deleted single credential successfully",
            data: removeSingleCredentialsForUser,
        });
    }
    catch (error) {
        if (error.message === "Not found")
            error.status = 404;
        next(error);
    }
}));
router.get("/generate-password/:length", (0, authorization_1.default)(), (req, res, next) => {
    try {
        const validLens = [15, 20, 25];
        let randomString = "";
        const { length } = req.params;
        const convertLengthToNumber = parseInt(length, 10);
        if (isNaN(convertLengthToNumber))
            throw new Error("Must be a number");
        if (!validLens.includes(convertLengthToNumber))
            throw new Error("Not a valid length");
        for (let i = 0; i < Number(req.params.length); i++) {
            let randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        if (randomString.length <= 0)
            throw new Error("Having issues generating random password");
        res.status(201).json({
            success: true,
            message: "Generated random password successfully",
            data: randomString,
        });
    }
    catch (error) {
        if (error.message.includes("Must be a number"))
            error.status = 400;
        if (error.message.includes("Not a valid length"))
            error.status = 400;
        next(error);
    }
});
exports.default = router;
