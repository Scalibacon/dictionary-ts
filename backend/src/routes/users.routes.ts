import { Router } from "express";
import authController from "../controllers/auth.controller";

const userRouter = Router();

userRouter.post('/signup', (request, response, next) => {
  // validate
  next();
}, authController.createUser);

userRouter.post('/signin', (request, response, next) => {
  // validate
  next();
}, authController.logIn);

export default userRouter;