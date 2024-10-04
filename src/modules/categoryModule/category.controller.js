import categoryModel from "../../../database/model/category.model.js";
import slugify from "slugify";
import { handleError } from "../../middleware/handleError.js";
import { apiFeatures } from "../../util/APIfeatures.js";

const addCategory = handleError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);

  req.body.image = req.file.filename;

  const category = await categoryModel.create(req.body);
  res.json({ message: "category added", category });
});

const getCategory = handleError(async (req, res, next) => {
  const category = await categoryModel.findById(req.params.id);

  category
    ? res.json({ message: "category ", category })
    : res.json({ message: "category not found", category });
});

const getCategories = handleError(async (req, res, next) => {
  let apiFeature = new apiFeatures(categoryModel.find(), req.query)
    .pagination()
    .fields()
    .search()
    .sort()
    .filter();

  const categories = await apiFeature.mongooseQuery;

  categories
    ? res.json({ message: "categories", categories })
    : res.json({ message: "category not found", categories });
});

const updateCategory = handleError(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }

  const category = await categoryModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.json({ message: "category updated", category });
});

const deleteCategory = handleError(async (req, res, next) => {
  const category = await categoryModel.findByIdAndDelete(req.params.id);

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
