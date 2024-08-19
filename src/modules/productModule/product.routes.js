import { Router } from "express";
import brandControllers from "./product.controller.js";

const BrandRouter = Router();

BrandRouter.post("/addCategory", brandControllers.addBrand);
BrandRouter.get("/getCategories", brandControllers.getBrands);
BrandRouter.route("/:id")
  .get(brandControllers.getBrand)
  .put(brandControllers.updateBrand)
  .delete(brandControllers.deleteBrand);

export default BrandRouter;
