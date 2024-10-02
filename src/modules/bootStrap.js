import BrandRouter from "./brandModule/brand.routes.js";
import CategoryRouter from "./categoryModule/category.routes.js";
import subCategoryRouter from "./subCategoryModule/subCategory.routes.js";
import ProductRouter from "./productModule/product.routes.js";
import authRouter from "./authModule/auth.routes.js";
import userRouter from "./userModule/user.routes.js";
import reviewRouter from "./reviewModule/review.routes.js";


export const BootStrap = (app) => {

  app.use("/api/v1/categories", CategoryRouter);
  app.use("/api/v1/subCategories", subCategoryRouter);
  app.use("/api/v1/brands", BrandRouter);
  app.use("/api/v1/products", ProductRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/review", reviewRouter);
  
};
