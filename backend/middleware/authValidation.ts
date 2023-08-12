import { body, checkExact, validationResult } from "express-validator";

const loginValidationRules = () => {
  return [
    body("email").isEmail().normalizeEmail().trim().isString(),
    body("password").trim().isString(),
    checkExact([], {
      message: (fields) => {
        const [field] = fields;
        return `Unknown field ${field.path} in ${field.location} with value ${field.value}`;
      },
    }),
  ];
};

const signUpValidationRules = () => {
  return [
    body("email").isEmail().normalizeEmail().trim(),
    body("fullName").trim().isString(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 chars long")
      .trim()
      .isString(),
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

export { loginValidationRules, signUpValidationRules, validate };
