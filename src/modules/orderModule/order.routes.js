import { Router } from "express";
import orderControllers from "./order.controller.js";
import authController from "../authModule/auth.controller.js";

const orderRouter = Router();

orderRouter
  .route("/")
  .post(authController.protectedRoutes, orderControllers.createOrder)
  .get(authController.protectedRoutes, orderControllers.getOrder);
orderRouter
  .route("/allOrders")
  .get(authController.protectedRoutes, orderControllers.getAllOrder);

export default orderRouter;
