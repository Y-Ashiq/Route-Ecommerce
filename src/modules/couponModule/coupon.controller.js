import couponModel from "../../../database/model/coupon.model.js";
import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../util/AppError.js";

const createCoupon = handleError(async (req, res, next) => {
  const coupon = await couponModel.create(req.body);

  coupon
    ? res.json({ message: "added coupon", coupon })
    : next(new AppError("error", 500));
});

const removeCoupon = handleError(async (req, res, next) => {
  const coupon = await couponModel.findByIdAndDelete(req.params.id);

  coupon
    ? res.json({ message: "coupon deleted", coupon })
    : next(new AppError("error", 500));
});

const getAllCoupon = handleError(async (req, res, next) => {
  const coupon = await couponModel.find();

  coupon
    ? res.json({ message: " coupon", coupon })
    : next(new AppError("error", 500));
});
const getCoupon = handleError(async (req, res, next) => {
  const coupon = await couponModel.findById(req.params.id);

  coupon
    ? res.json({ message: " coupon", coupon })
    : next(new AppError("error", 500));
});

export default {
  createCoupon,
  removeCoupon,
  getAllCoupon,
  getCoupon,
};
