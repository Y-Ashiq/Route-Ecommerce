import { Router } from "express";
import categoriesController from "./category.controller.js";
import { imgUpload } from "../../util/imgUpload.js";
import { validation } from "../../middleware/validation.js";
import { addCategorySchema, getIdSchema } from "./category.validation.js";

const CategoryRouter = Router();

CategoryRouter.post("/addCategory",imgUpload("image"),validation(addCategorySchema) ,categoriesController.addCategory);

CategoryRouter.get("/getCategories", categoriesController.getCategories);


CategoryRouter.route("/:id")
  .get(validation(getIdSchema),categoriesController.getCategory)
  .put(categoriesController.updateCategory)
  .delete(categoriesController.deleteCategory);

export default CategoryRouter;
