import BrandRouter from "./brandModule/brand.routes.js";
import CategoryRouter from "./categoryModule/category.routes.js";
import subCategoryRouter from "./subCategoryModule/subCategory.routes.js";
import ProductRouter from "./productModule/product.routes.js";
export const BootStrap = (app) => {
  app.use("/api/v1/categories", CategoryRouter);
  app.use("/api/v1/subCategories", subCategoryRouter);
  app.use("/api/v1/brands", BrandRouter);
  app.use("/api/v1/products", ProductRouter);
};
