import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [3, "too short"],
    },
    email: { type: String, unique: true },

    password: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    confirmEmail: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
