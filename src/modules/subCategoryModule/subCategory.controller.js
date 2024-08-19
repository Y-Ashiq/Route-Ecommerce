import subCategoryModel from "../../../database/model/subCategory.model.js";
import slugify from "slugify";
import { handleError } from "../../middleware/handleError.js";

const addCategory = handleError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const category = await subCategoryModel.create(req.body);
  res.json({ message: "category added", category });
});

const getCategory = handleError(async (req, res, next) => {
  const category = await subCategoryModel.findById(req.params.id);

  category
    ? res.json({ message: "category ", category })
    : res.json({ message: "category not found", category });
});

const getCategories = handleError(async (req, res, next) => {
  const categories = await subCategoryModel.find();

  categories
    ? res.json({ message: "categories", categories })
    : res.json({ message: "category not found", categories });
});

const updateCategory = handleError(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }

  const category = await subCategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.json({ message: "category updated", category });
});

const deleteCategory = handleError(async (req, res, next) => {
  const category = await subCategoryModel.findByIdAndDelete(req.params.id);

  category
    ? res.json({ message: "category deleted", category })
    : res.json({ message: "category not found", category });
});

export default {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
