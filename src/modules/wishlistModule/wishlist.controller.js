import userModel from "../../../database/model/user.model.js";
import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../util/AppError.js";

const addToWishlist = handleError(async (req, res, next) => {
  let { product } = req.body;

  const wishlist = await userModel.findOneAndUpdate(
    req.use._id,
    { $addToSet: { wishlist: product } },
    { new: true }
  );

  wishlist
    ? res.json({ message: "added to wishlist", wishlist })
    : next(new AppError("error", 500));
});

const removeWishlist = handleError(async (req, res, next) => {
  let { product } = req.body;

  const wishlist = await userModel.findOneAndUpdate(
    req.user._id,
    { $pull: { wishlist: product } },
    { new: true }
  );

  wishlist
    ? res.json({ message: "deleted from wishlist", wishlist })
    : next(new AppError("error", 500));
});

const getAllWishlist = handleError(async (req, res, next) => {
  const wishlist = await userModel.findOne({ _id: req.user._id }).populate("wishlist");

  wishlist
    ? res.json({ message: " wishlist", wishlist })
    : next(new AppError("error", 500));
});

export default {
  addToWishlist,
  removeWishlist,
  getAllWishlist
};
