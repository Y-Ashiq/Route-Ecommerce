import { Router } from "express";
import subCategoriesController from "./subCategory.controller.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/addCategory", subCategoriesController.addCategory);
subCategoryRouter.get("/getCategories", subCategoriesController.getCategories);
subCategoryRouter
  .route("/:id")
  .get(subCategoriesController.getCategory)
  .put(subCategoriesController.updateCategory)
  .delete(subCategoriesController.deleteCategory);

export default subCategoryRouter;
