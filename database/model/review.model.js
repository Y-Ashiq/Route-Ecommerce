import mongoose, { Types } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
    },
    rate: { type: number, min: 0, max: 5, required: true },
    userId: { type: Types.ObjectId, res: "user" },
    productId: { type: Types.ObjectId, res: "product" },
  },
  { timestamps: true, versionKey: false }
);

const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;
