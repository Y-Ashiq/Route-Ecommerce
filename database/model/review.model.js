import mongoose, { Types } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
    },
    rate: { type: Number, min: 0, max: 5, required: true },
    userId: { type: Types.ObjectId, res: "user" },
    productId: { type: Types.ObjectId, res: "product" },
  },
  { timestamps: true, versionKey: false }
);

reviewSchema.pre(/^find/, function () {
  this.populate("user", "name");
});
const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;
