import { Router } from "express";
import categoriesController from "./category.controller.js";

const CategoryRouter = Router();

CategoryRouter.post("/addCategory", categoriesController.addCategory);
CategoryRouter.get("/getCategories", categoriesController.getCategories);
CategoryRouter.route("/:id")
  .get(categoriesController.getCategory)
  .put(categoriesController.updateCategory)
  .delete(categoriesController.deleteCategory);

export default CategoryRouter;
