import fs from 'fs';
import path from "path";
import { httpRequest } from '../config/httpRequest';
import DBConnection from '../database/DBConnection';

type TypeFetchList = {
  results: string[],
  totalDocs: number,
  page: number,
  totalPages: number,
  hasNext: boolean,
  hasPrev: boolean
}

class WordsService {
  async fetchWordsList(search: string, limit: number, page: number): Promise<TypeFetchList | Error> {
    try {
      if (isNaN(limit)) limit = Number.MAX_SAFE_INTEGER;
      if (isNaN(page)) page = 1;

      const wordsFile = path.join(__dirname, '..', 'utils', 'WORDS.txt');
      const words = await fs.promises.readFile(wordsFile, 'utf-8');
      const arrayWords = words.split('\r\n');
      const filteredWords = arrayWords.filter(word => word.includes(search));

      const results = filteredWords.filter((word, index) => index >= (page - 1) * limit && index < page * limit);
      const totalDocs = filteredWords.length;
      const totalPages = Math.ceil(filteredWords.length / limit);
      const hasNext = totalPages > page;
      const hasPrev = page > 1 && totalPages > 1;

      return {
        results,
        totalDocs,
        page,
        totalPages,
        hasNext,
        hasPrev
      };
    } catch (error) {
      if(error instanceof Error) console.log('Error trying to fetch list', error.message);
      return new Error('Error trying to fetch words');
    }
  }

  async fetchWordInfo(word: string){
    try{
      const result = await httpRequest.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const wordInfo = await result.data;

      return wordInfo[0];
    } catch(error){
      if(error instanceof Error) console.log('Error trying to fetch info', error.message);
      return new Error('No words found!');
    }
  }

  async favoriteWord(word: string, userId: string){
    try{
      let favorite = await DBConnection.connection.get(`SELECT * FROM favorite WHERE user_id = ? AND word = ?`, [userId, word]);

      if(favorite) {
        return new Error('Word already favorited!');
      }

      await DBConnection.connection.run(`
        INSERT INTO favorite (user_id, word, added) VALUES (?, ?, ?)
      `, [userId, word, new Date()]);

      return;
    } catch(error){
      if(error instanceof Error) console.log('Error trying to favorite word', error.message);
      return new Error('Error trying to favorite word');
    }
  }

  async unfavoriteWord(word: string, userId: string){
    try{
      await DBConnection.connection.run(`DELETE FROM favorite WHERE user_id = ? AND word = ?`, [userId, word]);

      return;
    } catch(error){
      if(error instanceof Error) console.log('Error trying to unfavorite word', error.message);
      return new Error('Error trying to unfavorite word');
    }
  }
}

export default new WordsService();