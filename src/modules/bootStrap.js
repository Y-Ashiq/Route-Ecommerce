import subCategoryRouter from "./subCategoryModule/subCategory.routes.js";
import CategoryRouter from "./categoryModule/category.routes.js";
import wishlistRouter from "./wishlistModule/wishlist.routes.js";
import ProductRouter from "./productModule/product.routes.js";
import couponRouter from "./couponModule/coupon.routes.js";
import reviewRouter from "./reviewModule/review.routes.js";
import BrandRouter from "./brandModule/brand.routes.js";
import orderRouter from "./orderModule/order.routes.js";
import authRouter from "./authModule/auth.routes.js";
import userRouter from "./userModule/user.routes.js";
import cartRouter from "./cartModule/cart.routes.js";

export const BootStrap = (app) => {
  app.use("/api/v1/subCategories", subCategoryRouter);
  app.use("/api/v1/categories", CategoryRouter);
  app.use("/api/v1/wishlist", wishlistRouter);
  app.use("/api/v1/products", ProductRouter);
  app.use("/api/v1/coupon", couponRouter);
  app.use("/api/v1/review", reviewRouter);
  app.use("/api/v1/brands", BrandRouter);
  app.use("/api/v1/order", orderRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/cart", cartRouter);
};
