"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
class Models {
    constructor() {
        this.generatingSchemas();
    }
    generatingSchemas() {
        this.userSchema = new mongoose_1.Schema({
            email: { type: String, required: true, unique: true },
            fullName: { type: String, required: true },
            password: { type: String, required: true },
        }, {
            timestamps: true,
            toJSON: { virtuals: true },
            toObject: { virtuals: true },
            id: false,
        });
        this.userSchema.virtual("credentials", {
            ref: "Credential",
            foreignField: "userId",
            localField: "_id",
        });
        this.credentialSchema = new mongoose_1.Schema({
            userId: { type: mongoose_1.default.Types.ObjectId, ref: "Users" },
            username: { type: String, required: true },
            website: { type: String, unique: true, required: true },
            password: { type: String, unique: true, required: true },
        }, {
            versionKey: false,
            timestamps: true,
            id: false,
        });
    }
    schema() {
        this.userSchema.plugin(mongoose_unique_validator_1.default);
        return {
            Users: (0, mongoose_1.model)("User", this.userSchema),
            Credential: (0, mongoose_1.model)("Credential", this.credentialSchema),
        };
    }
}
const models = new Models();
exports.default = models;
