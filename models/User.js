// models\User.js

import mongoose from "mongoose";
import token from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

//generateAuthToken method
userSchema.methods.generateAuthToken = function () {
  const jwtSecret = process.env.JWT_SECRET;
  const tokenPayload = { id: this._id, email: this.email, role: this.role };
  return token.sign(tokenPayload, jwtSecret, { expiresIn: "7d" });
};

//comparePassword method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
