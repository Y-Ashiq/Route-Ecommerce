import { Router } from "express";
import userController from "./user.controller.js";

const userRouter = Router();

userRouter.post("/", userController.addUser);
userRouter.get("/", userController.getUsers);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

userRouter.put("/changePassword/:id", userController.changePassword);

export default userRouter;
