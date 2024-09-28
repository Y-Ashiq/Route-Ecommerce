import { Router } from "express";
import subCategoriesController from "./subCategory.controller.js";

const subCategoryRouter = Router({mergeParams:true});

subCategoryRouter.post("/", subCategoriesController.addSubCategory);
subCategoryRouter.get("/", subCategoriesController.getSubCategories);
subCategoryRouter
  .route("/:id")
  .get(subCategoriesController.getSubCategory)
  .put(subCategoriesController.updateSubCategory)
  .delete(subCategoriesController.deleteSubCategory);

export default subCategoryRouter;
