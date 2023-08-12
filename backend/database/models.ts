import mongoose, { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class Models {
  userSchema!: Schema;
  credentialSchema!: Schema;

  constructor() {
    this.generatingSchemas();
  }

  generatingSchemas() {
    this.userSchema = new Schema(
      {
        email: { type: String, required: true, unique: true },
        fullName: { type: String, required: true },
        password: { type: String, required: true },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false,
      }
    );

    this.userSchema.virtual("credentials", {
      ref: "Credential",
      foreignField: "userId",
      localField: "_id",
    });

    this.credentialSchema = new Schema(
      {
        userId: { type: mongoose.Types.ObjectId, ref: "Users" },
        username: { type: String, required: true },
        website: { type: String, unique: true, required: true },
        password: { type: String, unique: true, required: true },
      },
      {
        versionKey: false,
        timestamps: true,
        id: false,
      }
    );
  }

  schema() {
    this.userSchema.plugin(uniqueValidator);

    return {
      Users: model("User", this.userSchema),
      Credential: model("Credential", this.credentialSchema),
    };
  }
}

const models = new Models();
export default models;
