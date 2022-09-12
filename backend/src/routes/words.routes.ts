import { Router } from "express";
import wordsController from "../controllers/words.controller";

const wordRouter = Router();

wordRouter.get('/en/:word', wordsController.fetchWordInfo);

wordRouter.get('/en', (request, response, next) => {
  const { search, limit, page } = request.query;  

  if(typeof search !== 'string') {
    return response.status(400).json({ message: 'Invalid search!'}); 
  } 
  
  next();
}, wordsController.fetchWordsList);

export default wordRouter;