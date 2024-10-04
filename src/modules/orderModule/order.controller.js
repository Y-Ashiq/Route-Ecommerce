import cartModel from "../../../database/model/cart.model.js";
import orderModel from "../../../database/model/order.model.js";
import ProductModel from "../../../database/model/product.model.js";
import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../util/AppError.js";

const createOrder = handleError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);

  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? totalPriceAfterDiscount
    : cart.totalPrice;

  let order = new orderModel({
    user: req.user._id,
    cartItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });

  if (order) {
    let options = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
      },
    }));
    await ProductModel.bulkWrite(options);
    await order.save();
  } else {
    return next(new AppError("error occurred", 409));
  }
  await cartModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Done", order });
});

const getOrder = handleError(async (req, res, next) => {
  let order = await orderModel
    .findOne({ user: req.user._id })
    .populate("cartItems.product");
  res.json({ message: "your order", order });
});
const getAllOrder = handleError(async (req, res, next) => {
  let order = await orderModel.find({ user: req.user._id });
  res.json({ message: "your order", order });
});

export default {
  createOrder,
  getAllOrder,
  getOrder
};
