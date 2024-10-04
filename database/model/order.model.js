import mongoose, { Types } from "mongoose";

const orderSchema = new mongoose.Schema(
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
    totalOrderPrice: Number,
    discount: Number,
    totalOrderAfterDiscount: Number,
    paymentMethod: {
      type: String,
      enum: ["cash", "credit"],
      default: "cash",
    },
    shippingAddress: {
      city: String,
      street: String,
    },
    isPaid: Boolean,
    paidAt: Date,
    isDelivered: Boolean,
  },

  { timestamps: true, versionKey: false }
);

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
