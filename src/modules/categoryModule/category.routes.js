import { Router } from "express";
import categoriesController from "./category.controller.js";
import { imgUpload } from "../../util/imgUpload.js";
import { validation } from "../../middleware/validation.js";
import { addCategorySchema, getIdSchema } from "./category.validation.js";
import subCategoryRouter from "../subCategoryModule/subCategory.routes.js";

const CategoryRouter = Router();

CategoryRouter.use("/:category/subCategory", subCategoryRouter);

CategoryRouter.route("/")
  .post(
    imgUpload("image"),
    validation(addCategorySchema),
    categoriesController.addCategory
  )
  .get(categoriesController.getCategories);

CategoryRouter.route("/:id")
  .get(validation(getIdSchema), categoriesController.getCategory)
  .put(categoriesController.updateCategory)
  .delete(categoriesController.deleteCategory);

export default CategoryRouter;
