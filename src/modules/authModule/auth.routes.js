import { Router } from "express";
import authController from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/signin", authController.signIn);
authRouter.post("/signup", authController.signUP);


export default authRouter;
