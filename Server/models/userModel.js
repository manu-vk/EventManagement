import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },
    lastLogin: {
      type: Date,
      default: null,
    },

    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);