import ProductModel from "../../../database/model/product.model.js"; 
import { handleError } from "../../middleware/handleError.js";

const addProduct = handleError(async (req, res, next) => {
  const product = await ProductModel.create(req.body);
  res.json({ message: "product added", product });
});

const getProduct =handleError( async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  product
    ? res.json({ message: "product ", product })
    : res.json({ message: "product not found", product });
});

const getProducts = handleError(async (req, res, next) => {
  const products = await ProductModel.find();

  products
    ? res.json({ message: "products", products })
    : res.json({ message: "product not found", products });
});

const updateProduct = handleError(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }

  const product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.json({ message: "product updated", product });
});

const deleteProduct =handleError( async (req, res, next) => {
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
