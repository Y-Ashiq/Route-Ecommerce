import reviewModel from "../../../database/model/review.model.js";
import { handleError } from "../../middleware/handleError.js";
import { apiFeatures } from "../../util/APIfeatures.js";
import { AppError } from "../../util/AppError.js";

const addReview = handleError(async (req, res, next) => {
  let reviewed = await reviewModel.findOne({
    userId: req.user._id,
    productId: req.body.productId,
  });
  if (reviewed) return next(new AppError("you already made a review", 409));
  const Review = await reviewModel.create(req.body);
  res.json({ message: "Review added", Review });
});

const getReview = handleError(async (req, res, next) => {
  const Review = await reviewModel.findById(req.params.id);

  Review
    ? res.json({ message: "Review ", Review })
    : next(new AppError("review not found", 404));
});

const getReviews = handleError(async (req, res, next) => {
  let apiFeature = new apiFeatures(reviewModel.find(), req.query)
    .pagination()
    .fields()
    .search()
    .sort()
    .filter();

  const Reviews = await apiFeature.mongooseQuery;

  Reviews
    ? res.json({ message: "Reviews", Reviews })
    : next(new AppError("review not found", 404));
});

const updateReview = handleError(async (req, res, next) => {
  const Review = await reviewModel.findOneAndUpdate(
    { id: _id, userId: req.user._id },
    req.body
  );

  Review
    ? res.json({ message: "Review updated", Review })
    : next(new AppError("review not found", 404));
});

const deleteReview = handleError(async (req, res, next) => {
  const Review = await reviewModel.findByIdAndDelete(req.params.id);

  Review
    ? res.json({ message: "Review deleted", Review })
    : next(new AppError("review not found", 404));
});

export default {
  addReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};
