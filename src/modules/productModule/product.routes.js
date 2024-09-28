import { Router } from "express";
import ProductControllers from "./product.controller.js";
import { fieldsUpload } from "../../util/imgUpload.js";

const ProductRouter = Router();

ProductRouter.post(
  "/",
  fieldsUpload([
    { name: "imageCover", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  ProductControllers.addProduct
);
ProductRouter.get("/", ProductControllers.getProducts);
ProductRouter.route("/:id")
  .get(ProductControllers.getProduct)
  .patch(
    fieldsUpload([
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    ProductControllers.updateProduct
  )
  .delete(ProductControllers.deleteProduct);

export default ProductRouter;
