import { Router } from "express";
import cartControllers from "./cart.controller.js";
import authController from "../authModule/auth.controller.js";

const cartRouter = Router();

cartRouter
  .route("/")
  .post(authController.protectedRoutes, cartControllers.createCart)
  .get(authController.protectedRoutes, cartControllers.getCart);
cartRouter
  .route("/:id")
  .delete(authController.protectedRoutes, cartControllers.removeCartItems)
  .put(authController.protectedRoutes, cartControllers.updateCart);

export default cartRouter;
