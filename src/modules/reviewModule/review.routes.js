import { Router } from "express";
import reviewControllers from "./review.controller.js";
import authController from "../authModule/auth.controller.js";

const reviewRouter = Router();

reviewRouter
  .route("/")
  .post(authController.protectedRoutes, reviewControllers.addReview)
  .get(reviewControllers.getReviews);

reviewRouter
  .route("/:id")
  .get(reviewControllers.getReview)
  .put(authController.protectedRoutes, reviewControllers.updateReview)
  .delete(reviewControllers.deleteReview);

export default reviewRouter;
