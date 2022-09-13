import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import userService from "../services/user.service";
import wordsService from "../services/words.service";
import User from "../types/User";

class WordController {
  async fetchWordsList(request: Request, response: Response) {
    const search = request.query.search as string;
    const limit = parseInt(request.query.limit as string);
    const page = parseInt(request.query.page as string);

    const wordsList = await wordsService.fetchWordsList(search, limit, page);

    if (wordsList instanceof Error) {
      return response.status(400).json({ message: wordsList.message });
    }

    return response.status(200).json(wordsList)
  }

  async fetchWordInfo(request: Request, response: Response) {
    try {
      const word = request.params.word;
      const token = request.headers['x-access-token'] as string | undefined;

      const wordInfo = await wordsService.fetchWordInfo(word);

      if (wordInfo instanceof Error) {
        return response.status(400).json({ message: wordInfo.message });
      }

      if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET || "1S3GR3D0H4RD") as User;

        userService.saveWordInHistory(word, decodedToken.user_id);
      }

      return response.status(200).json(wordInfo);
    } catch (error) {
      return response.status(400).json({ message: "Error trying to fetch words" });
    }
  }

  async favoriteWord(request: Request, response: Response) {
    try{
      const word: string = request.params.word;
      const token = request.headers['x-access-token'] as string | undefined;

      if (!token) {
        return response.status(400).json({ message: 'No token provided!' });
      }
      
      const decodedToken = jwt.verify(token, process.env.SECRET || "1S3GR3D0H4RD") as User;

      const result = await wordsService.favoriteWord(word, decodedToken.user_id);

      if(result instanceof Error){
        return response.status(400).json({ message: 'Error trying to favorite word!'});
      }

      return response.status(201).json({ message: 'Success!'});

    } catch(error){
      return response.status(400).json({ message: "Error trying to favorite word" });
    }
  }

  async unfavoriteWord(request: Request, response: Response) {
    try{
      const word: string = request.params.word;
      const token = request.headers['x-access-token'] as string | undefined;

      if (!token) {
        return response.status(400).json({ message: 'No token provided!' });
      }
      
      const decodedToken = jwt.verify(token, process.env.SECRET || "1S3GR3D0H4RD") as User;

      const result = await wordsService.unfavoriteWord(word, decodedToken.user_id);

      if(result instanceof Error){
        return response.status(400).json({ message: 'Error trying to unfavorite word!'});
      }

      return response.status(200).json({ message: 'Success!'});

    } catch(error){
      return response.status(400).json({ message: "Error trying to unfavorite word" });
    }
  }
}

export default new WordController();