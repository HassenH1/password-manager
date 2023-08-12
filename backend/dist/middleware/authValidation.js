"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.signUpValidationRules = exports.loginValidationRules = void 0;
const express_validator_1 = require("express-validator");
const loginValidationRules = () => {
    return [
        (0, express_validator_1.body)("email").isEmail().normalizeEmail().trim().isString(),
        (0, express_validator_1.body)("password").trim().isString(),
        (0, express_validator_1.checkExact)([], {
            message: (fields) => {
                const [field] = fields;
                return `Unknown field ${field.path} in ${field.location} with value ${field.value}`;
            },
        }),
    ];
};
exports.loginValidationRules = loginValidationRules;
const signUpValidationRules = () => {
    return [
        (0, express_validator_1.body)("email").isEmail().normalizeEmail().trim(),
        (0, express_validator_1.body)("fullName").trim().isString(),
        (0, express_validator_1.body)("password")
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 chars long")
            .trim()
            .isString(),
        (0, express_validator_1.checkExact)([], {
            message: (fields) => {
                const [field] = fields;
                return `Unknown field ${field.path} in ${field.location} with value ${field.value}`;
            },
        }),
    ];
};
exports.signUpValidationRules = signUpValidationRules;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
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
