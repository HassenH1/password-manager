import { checkExact, oneOf } from "express-validator";

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
    checkExact([], {
      message: (fields) => {
        const [field] = fields;
        return `Unknown field ${field.path} in ${field.location} with value ${field.value}`;
      },
    }),
  ];
};

const patchCredentialValidationRules = () => {
  return [
    body("username").isString().trim().optional(),
    body("password").isLength({ min: 5 }).trim().isString().optional(),
    body("website").isString().trim().optional(),
    checkExact([], {
      message: (fields) => {
        const [field] = fields;
        return `Unknown field ${field.path} in ${field.location} with value ${field.value}`;
      },
    }),
  ];
};

const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: { [x: number]: any }[] = [];
  errors
    .array()
    .map((err: any) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export {
  createCredentialValidationRules,
  patchCredentialValidationRules,
  validate,
};
