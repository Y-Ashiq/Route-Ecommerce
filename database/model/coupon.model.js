import mongoose, { Types } from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
      unique: true,
    },
    expire: Date,
    discount: {
      type: Number,
      min: 1,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    type: {
      type: String,
      enum: ["fixed", "percentage"],
      default: "fixed",
    },
  },
  { timestamps: true, versionKey: false }
);

const couponModel = mongoose.model("coupon", couponSchema);

export default couponModel;
