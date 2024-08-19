import BrandModel from "../../../database/model/brand.model.js"; 
import { handleError } from "../../middleware/handleError.js";

const addBrand = handleError(async (req, res, next) => {
  const brand = await BrandModel.create(req.body);
  res.json({ message: "brand added", brand });
});

const getBrand =handleError( async (req, res, next) => {
  const brand = await BrandModel.findById(req.params.id);

  brand
    ? res.json({ message: "brand ", brand })
    : res.json({ message: "brand not found", brand });
});

const getBrands = handleError(async (req, res, next) => {
  const categories = await BrandModel.find();

  categories
    ? res.json({ message: "categories", categories })
    : res.json({ message: "brand not found", categories });
});

const updateBrand = handleError(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }

  const brand = await BrandModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.json({ message: "brand updated", brand });
});

const deleteBrand =handleError( async (req, res, next) => {
  const brand = await BrandModel.findByIdAndDelete(req.params.id);

  brand
    ? res.json({ message: "brand deleted", brand })
    : res.json({ message: "brand not found", brand });
});

export default {
  addBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
