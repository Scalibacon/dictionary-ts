import { Router } from "express";
import authController from "../controllers/auth.controller";
import userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/auth/signup', (request, response, next) => {
  // validate
  next();
}, authController.createUser);

userRouter.post('/auth/signin', (request, response, next) => {
  // validate
  next();
}, authController.logIn);

userRouter.get('/user/me', (request, response, next) => {
  // validate
  next();
}, userController.getUserProfile);

userRouter.get('/user/me/history', (request, response, next) => {
  // validate
  next();
}, userController.getUserHistory);

userRouter.get('/user/me/favorites', (request, response, next) => {
  // validate
  next();
}, userController.getUserFavorites);

export default userRouter;