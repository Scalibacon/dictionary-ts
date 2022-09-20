import { Router } from "express";
import wordsController from "../controllers/words.controller";

const wordRouter = Router();

wordRouter.get('/en/:word', wordsController.fetchWordInfo);

wordRouter.post('/en/:word/favorite', wordsController.favoriteWord);

wordRouter.delete('/en/:word/unfavorite', wordsController.unfavoriteWord);

wordRouter.get('/en', (request, response, next) => {
  // validate
  
  next();
}, wordsController.fetchWordsList);

export default wordRouter;