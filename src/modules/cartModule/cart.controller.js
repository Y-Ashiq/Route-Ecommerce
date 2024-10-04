import cartModel from "../../../database/model/cart.model.js";
import ProductModel from "../../../database/model/product.model.js";
import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../util/AppError.js";

function calcPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((ele) => {
    totalPrice += ele.quantity * ele.price;
  });

  cart.totalPrice = totalPrice;
}

const createCart = handleError(async (req, res, next) => {
  let product = await ProductModel.findById(req.body.product).select("price");
  !product && next(new AppError("product not found", 404));

  req.body.price = product.price;
  let isExist = await cartModel.findOne({ user: req.user._id });

  if (!isExist) {
    let cart = new cartModel({
      user: req.user._id,
      cartItems: [req.body],
    });
    calcPrice(isExist);
    await cart.save();

    return res.json({ message: "cart created", cart });
  }

  let item = isExist.cartItems.find((ele) => ele.product == req.body.product);
  if (item) {
    item.quantity += 1;
  } else {
    isExist.cartItems.push(req.body);
  }
  calcPrice(isExist);

  await isExist.save();
  res.json({ message: "done", isExist });
});
const updateCart = handleError(async (req, res, next) => {
  let product = await ProductModel.findById(req.body.product).select("price");
  !product && next(new AppError("product not found", 404));

  req.body.price = product.price;
  let isExist = await cartModel.findOne({ user: req.user._id });

  let item = isExist.cartItems.find((ele) => ele.product == req.body.product);
  !item && next(new AppError("not found", 404));
  if (item) {
    item.quantity = req.body.quantity;
  } else {
    isExist.cartItems.push(req.body);
  }
  calcPrice(isExist);

  await isExist.save();
  res.json({ message: "done", isExist });
});

const getCart = handleError(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.user._id });
  res.json({ message: "cart items", cart });
});

const removeCartItems = handleError(async (req, res, next) => {
  let cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );
  res.json({ message: "items removed", cart });
});

export default {
  createCart,
  getCart,
  removeCartItems,
  updateCart,
};
