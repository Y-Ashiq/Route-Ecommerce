import mongoose, { Types } from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    cartItems: [
      {
        products: {
          type: Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
      },
    ],
    totalPrice: Number,
    discount: Number,
    totalPriceAfterDiscount: Number,
  },
  { timestamps: true, versionKey: false }
);

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
