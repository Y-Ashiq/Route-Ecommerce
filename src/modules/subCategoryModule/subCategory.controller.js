import subCategoryModel from "../../../database/model/subCategory.model.js";
import slugify from "slugify";
import { handleError } from "../../middleware/handleError.js";

const addSubCategory = handleError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const SubCategory = await subCategoryModel.create(req.body);
  res.json({ message: "SubCategory added", SubCategory });
});

const getSubCategory = handleError(async (req, res, next) => {
  const SubCategory = await subCategoryModel.findById(req.params.id);

  category
    ? res.json({ message: "SubCategory ", SubCategory })
    : res.json({ message: "SubCategory not found", SubCategory });
});

const getSubCategories = handleError(async (req, res, next) => {
  const SubCategory = await subCategoryModel.find({category:req.params.category});

  SubCategory
    ? res.json({ message: "SubCategory", SubCategory })
    : res.json({ message: "SubCategory not found", SubCategory });
});

const updateSubCategory= handleError(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }

  const SubCategory = await subCategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.json({ message: "SubCategory updated", SubCategory });
});

const deleteSubCategory = handleError(async (req, res, next) => {
  const SubCategory = await subCategoryModel.findByIdAndDelete(req.params.id);

  SubCategory
    ? res.json({ message: "SubCategory deleted", SubCategory })
    : res.json({ message: "SubCategory not found", SubCategory });
});

export default {
  addSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
};
