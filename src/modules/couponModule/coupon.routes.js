import { Router } from "express";
import couponControllers from "./coupon.controller.js";

const couponRouter = Router();
couponRouter
  .route("/")
  .post(couponControllers.createCoupon)
  .get(couponControllers.getAllCoupon);

couponRouter
  .route("/:id")
  .delete(couponControllers.removeCoupon)
  .get(couponControllers.getCoupon);

export default couponRouter;
