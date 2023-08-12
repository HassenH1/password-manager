"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.patchCredentialValidationRules = exports.createCredentialValidationRules = void 0;
const express_validator_1 = require("express-validator");
const { body, validationResult } = require("express-validator");
const createCredentialValidationRules = () => {
    return [
        body("userId").isString().trim().withMessage("User id is required"),
        body("username").isString().trim().withMessage("Username is required"),
        body("password")
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 chars long")
            .trim()
            .isString(),
        body("website").isString().trim().withMessage("Website is required"),
        (0, express_validator_1.checkExact)([], {
            message: (fields) => {
                const [field] = fields;
                return `Unknown field ${field.path} in ${field.location} with value ${field.value}`;
            },
        }),
    ];
};
exports.createCredentialValidationRules = createCredentialValidationRules;
const patchCredentialValidationRules = () => {
    return [
        body("username").isString().trim().optional(),
        body("password").isLength({ min: 5 }).trim().isString().optional(),
        body("website").isString().trim().optional(),
        (0, express_validator_1.checkExact)([], {
            message: (fields) => {
                const [field] = fields;
                return `Unknown field ${field.path} in ${field.location} with value ${field.value}`;
            },
        }),
    ];
};
exports.patchCredentialValidationRules = patchCredentialValidationRules;
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors
        .array()
        .map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors,
    });
};
exports.validate = validate;
