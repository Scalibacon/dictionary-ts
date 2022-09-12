import { Request, Response } from "express";
import wordsService from "../services/words.service";

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
    const word = request.params.word;

    const wordInfo = await wordsService.fetchWordInfo(word);

    if (wordInfo instanceof Error) {
      return response.status(400).json({ message: wordInfo.message });
    } 

    return response.status(200).json(wordInfo);
  }

  async favoriteWord(request: Request, response: Response) {
    // salva a palavra na lista de favoritos do usuário
  }

  async unfavoriteWord(request: Request, response: Response) {
    // remove a palavra da lista de favoritos do usuário
  }
}

export default new WordController();