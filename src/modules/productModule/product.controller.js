import ProductModel from "../../../database/model/product.model.js";
import { handleError } from "../../middleware/handleError.js";
import { apiFeatures } from "../../util/APIfeatures.js";

const addProduct = handleError(async (req, res, next) => {
  req.body.images = req.files.images.map((ele) => ele.filename);
  req.body.imageCover = req.files.imageCover[0].filename;
  const product = await ProductModel.create(req.body);
  res.json({ message: "product added", product });
});

const getProduct = handleError(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  product
    ? res.json({ message: "product ", product })
    : res.json({ message: "product not found", product });
});

const getProducts = handleError(async (req, res, next) => {
  let apiFeature = new apiFeatures(ProductModel.find(), req.query)
    .pagination()
    .fields()
    .search()
    .sort()
    .filter();
    
  const products = await apiFeature.mongooseQuery;

  products
    ? res.json({ message: "products", products })
    : res.json({ message: "product not found", products });
});

const updateProduct = handleError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  if (req.files.imageCover)
    req.body.imageCover = req.files.imageCover[0].filename;

  if (req.files.images)
    req.body.images = req.files.images.map((ele) => ele.filename);
  let updateProduct = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  updateProduct && res.json({ message: "Done", updateProduct });
  !updateProduct && res.json({ message: "not found product" });
});

const deleteProduct = handleError(async (req, res, next) => {
  const product = await ProductModel.findByIdAndDelete(req.params.id);

  product
    ? res.json({ message: "product deleted", product })
    : res.json({ message: "product not found", product });
});

export default {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
