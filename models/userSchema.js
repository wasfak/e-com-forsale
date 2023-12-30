import { Schema, model, models } from "mongoose";

// User schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
    },
    userStatus: {
      type: String,
      default: "active",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Create the model from the schema
const UserModel = models.User || model("User", userSchema);

export default UserModel;
