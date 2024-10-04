import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [3, "name is too short"],
    },

    email: { type: String, unique: true, required: true },

    password: { type: String, required: true },

    wishlist: { type: Types.ObjectId, ref: "product" },

    phone: String,

    role: { type: String, enum: ["user", "admin"], default: "user" },

    confirmEmail: { type: Boolean, default: false },

    isBlocked: { type: Boolean, default: false },
    changePasswordAt: Date,
  },

  { timestamps: true, versionKey: false }
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});
userSchema.pre("findOneAndUpdate", function () {
  this._update.password = bcrypt.hashSync(this._update.password, 10);
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
