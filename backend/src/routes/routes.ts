import { Router } from "express";
import userRouter from "./user.routes";
import wordRouter from "./words.routes";

const routes = Router();

routes.use('/entries', wordRouter);
routes.use('/', userRouter);

routes.use('/', (request, response) => {
  return response.status(200).json({ message: 'Fullstack Challenge 🏅 - Dictionary' });
});

export default routes;