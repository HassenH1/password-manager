import mongoose from "mongoose";
import "dotenv/config";

class Connection {
  private uri: string = process.env.MONGO_CONNECTION_URL as string;
  // private uri: string = "mongodb://127.0.0.1:27017/password-generator";
  // private uri: string = "mongodb://localhost/password-generator";
  private static instance: Connection = new Connection();

  // need this for singleton design pattern
  private constructor() {}

  // get the only object available
  public static getInstance(): Connection {
    return Connection.instance;
  }

  connection(): void {
    mongoose.connect(this.uri);
    mongoose.connection.on("connected", () => {
      console.log(`Mongoose connected!!!`);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Mongoose error :( ", err);
    });
  }
}

export const db: Connection = Connection.getInstance();
