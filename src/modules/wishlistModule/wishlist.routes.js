import { Router } from "express";
import wishlistController from "./wishlist.controller.js";

const wishlistRouter = Router();

wishlistRouter.put("/", wishlistController.addToWishlist);
wishlistRouter.delete("/", wishlistController.removeWishlist);
wishlistRouter.get("/", wishlistController.getAllWishlist);

export default wishlistRouter;
