import { NextFunction, Request, Response, Router } from "express";
import models from "../database/models";
import { Bcrypt } from "../lib/bcrypt";
import authorize from "../middleware/authorization";
import {
  createCredentialValidationRules,
  patchCredentialValidationRules,
  validate,
} from "../middleware/credentialValidation";
import mongoose from "mongoose";

const router = Router();
const model = models.schema();
const credentials = model.Credential;
const bCrypt = new Bcrypt();
const charSet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+={}[]|:;/?.>,<";

router.post(
  "/create-credentials",
  authorize(),
  createCredentialValidationRules(),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cryptedPassword = bCrypt.hash(req.body.password);
      const createdCredentials = await credentials.create({
        ...req.body,
        password: cryptedPassword,
      });
      const savedCredentials = await createdCredentials.save();

      res.status(201).json({
        success: true,
        message: "Created credentials successfully",
        data: savedCredentials,
      });
    } catch (error: any) {
      if (error.message.includes("duplicate key error collection"))
        error.status = 400;
      if (error.message.includes("BSONTypeError")) error.status = 404;
      next(error);
    }
  }
);

router.get(
  "/get-all-credentials/:userId",
  authorize(),
  async (req, res, next) => {
    try {
      const getAllCredentialsForUser = await credentials.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(req.params.userId) } },
      ]);

      if (!getAllCredentialsForUser) throw new Error("Not found");

      res.status(200).json({
        success: true,
        message: "Credentials for user retrieved successfully",
        data: getAllCredentialsForUser,
      });
    } catch (error: any) {
      if (error.message === "Not found") error.status = 404;

      next(error);
    }
  }
);

router.get(
  "/get-single-credential/:id/:userId",
  authorize(),
  async (req, res, next) => {
    try {
      const { id, userId } = req.params;
      const getSingleCredentialsForUser = await credentials.findOne({
        _id: id,
        userId: userId,
      });

      if (!getSingleCredentialsForUser) throw new Error("Not found");

      res.status(200).json({
        success: true,
        message: "Retrieved single credential successfully",
        data: getSingleCredentialsForUser,
      });
    } catch (error: any) {
      if (error.message === "Not found") error.status = 404;

      next(error);
    }
  }
);

router.patch(
  "/patch-credentials/:id/:userId",
  authorize(),
  patchCredentialValidationRules(),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, userId } = req.params;
      if (req.body.password) {
        const patchedPassword = bCrypt.hash(req.body.password);
        req.body.password = patchedPassword;
      }

      const patchedCredential = await credentials.findOneAndUpdate(
        { _id: id, userId },
        req.body,
        { new: true }
      );

      if (!patchedCredential) throw new Error("Not found");

      res.status(201).json({
        success: true,
        message: "Patched credential successfully",
        data: patchedCredential,
      });
    } catch (error: any) {
      if (error.message.includes("Not found")) error.status = 404;

      next(error);
    }
  }
);

router.delete(
  "/remove-credentials/:id/:userId",
  authorize(),
  async (req, res, next) => {
    try {
      const { id, userId } = req.params;
      const removeSingleCredentialsForUser = await credentials.deleteOne({
        _id: id,
        userId: userId,
      });

      if (
        removeSingleCredentialsForUser.acknowledged &&
        removeSingleCredentialsForUser.deletedCount == 0
      )
        throw new Error("Not found");

      res.status(200).json({
        success: true,
        message: "Deleted single credential successfully",
        data: removeSingleCredentialsForUser,
      });
    } catch (error: any) {
      if (error.message === "Not found") error.status = 404;

      next(error);
    }
  }
);

router.get("/generate-password/:length", authorize(), (req, res, next) => {
  try {
    const validLens = [15, 20, 25];
    let randomString = "";
    const { length } = req.params;
    const convertLengthToNumber = parseInt(length, 10);

    if (isNaN(convertLengthToNumber)) throw new Error("Must be a number");

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
  } catch (error: any) {
    if (error.message.includes("Must be a number")) error.status = 400;
    if (error.message.includes("Not a valid length")) error.status = 400;

    next(error);
  }
});

export default router;
