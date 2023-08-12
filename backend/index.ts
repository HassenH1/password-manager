import cors from "cors";
import { db } from "./database/connection";
import express, { Express, NextFunction, Request, Response } from "express";
import userRoutes from "./routes/user";
import credentialsRoutes from "./routes/credentials";
import cookieParser from "cookie-parser";
import authorize from "./middleware/authorization";
import "dotenv/config";

db.connection();

const app: Express = express();
const port = process.env.PORT || 4000; // need to update port

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/auth", userRoutes);
app.use("/credentials", credentialsRoutes);
//random string generator
// console.log(require('crypto').randomBytes(256).toString('base64'));

/**
 * this is a test route
 * @todo need to remove this
 */
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running!");
});

/**
 * this is a test route
 * @todo need to remove this
 */
app.get("/dashboard", authorize(), (req: Request, res: Response) => {
  res.send("dashboard route with authorizer");
});

/**
 * this is a test route
 * @todo need to remove this
 */
app.post("/post", authorize(), (req, res) => {
  const { name } = req.body;
  res.send(`your name is ${name}`);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.header("Content-Type", "application/json");
  const buildErrorMessage = {
    success: err.success || false,
    message: err.message || "",
    data: null,
  };
  res.status(err.status || 500).json(buildErrorMessage);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
