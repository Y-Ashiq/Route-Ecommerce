import ProductModel from "../../../database/model/product.model.js";
import { handleError } from "../../middleware/handleError.js";

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
  let page = req.params.page * 1 || 1;
  if (req.query.page <= 0) page = 1;
  let skip = (page - 1) * 5;

  let filterObj = { ...req.query };
  let excludedQuery = ["page", "sort", "keywords", "fields"];

  excludedQuery.forEach((ele) => {
    delete filterObj[ele];
  });

  filterObj = JSON.stringify(filterObj);
  filterObj = filterObj.replace(/\gt|gte|lt|lte\b/g, (match) => `$${match}`);

  let mongooseQuery = ProductModel.find(filterObj).limit(5).skip(skip);
  if (req.params.sort) {
    let sortBy = req.params.sort.split(",").join(" ");
    mongooseQuery.sort(sortBy);
  }

  if (req.query.keyword) {
    mongooseQuery.find({
      $or: [
        { title: { $regex: req.query.keyword, $options: "i" } },
        { description: { $regex: req.query.keyword, $options: "i" } },
      ],
    });
  }

  if (req.query.fields) {
    let fields = req.params.fields / split(",").join(" ");

    mongooseQuery.select(fields);
  }
  const products = await mongooseQuery;

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
