import BrandRouter from "./brandModule/brand.routes.js"
import CategoryRouter from "./categoryModule/category.routes.js"
import subCategoryRouter from "./subCategoryModule/subCategory.routes.js"

export const BootStrap= (app)=>{


    app.use("/api/v1/categories",CategoryRouter)
    app.use("/api/v1/SubCategories",subCategoryRouter)
    app.use("/api/v1/Brands",BrandRouter)
}