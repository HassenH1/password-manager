import { NextFunction, Router, Response, Request } from "express";
import models from "../database/models";
import { Bcrypt } from "../lib/bcrypt";
import jwtService from "../lib/jwt";
import jwt from "jsonwebtoken";
import {
  loginValidationRules,
  signUpValidationRules,
  validate,
} from "../middleware/authValidation";

const router = Router();
const userModel = models.schema();
const Users = userModel.Users;
const crypt = new Bcrypt();

router.post(
  "/signup",
  signUpValidationRules(),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cryptedPassword = crypt.hash(req.body.password);
      const createdUser = await Users.create({
        ...req.body,
        password: cryptedPassword,
      });
      const savedUser = await createdUser.save();

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: savedUser,
      });
    } catch (err: any) {
      if (err.message.includes("to be unique")) err.status = 400;

      next(err);
    }
  }
);

router.post(
  "/login",
  loginValidationRules(),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const findUser = await Users.findOne({ email }).orFail();

      if (!crypt.comparePasswords(password, findUser.password))
        throw new Error("Password doesn't match");

      const token = jwtService.generateAccessToken({
        _id: findUser._id,
        email: findUser.email,
      });

      if (token && token.length > 0) {
        res.cookie("_h_p", `${token[0]}.${token[1]}`, {
          maxAge: 1000 * 60 * 30, // expires after 30 minutes
          sameSite: true,
        });

        res.cookie("_s", token[2], {
          httpOnly: true, // The cookie only accessible by the web server
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
    } catch (error: any) {
      if (
        error.message.includes("No document found") ||
        error.message.includes("Password doesn't match")
      ) {
        error.message = "Email/password doesn't match";
        error.status = 401;
      }
      next(error);
    }
  }
);

router.get("/check-token", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send({ success: false, message: "Unauthorized" });
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any) => {
      if (err) {
        res.status(401).send({ success: false, message: "Unauthorized" });
      } else {
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

export default router;
