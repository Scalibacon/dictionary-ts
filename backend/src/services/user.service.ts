import DBConnection from "../database/DBConnection";
import User from "../types/User";
import WordHistory from "../types/WordHistory";

class UserService {
  async getUserProfile(userId: string){
    try{
      let user: User | undefined = await DBConnection.connection.get(`SELECT user_id, name, email FROM user WHERE user_id = ?`, [userId]);

      if(!user){
        return new Error('No user found with the provided id');
      }

      return user;
    } catch(error){
      if(error instanceof Error) console.log('Error trying to get user profile', error.message);
      return new Error('Error trying to get user profile');
    }
  }

  async getUserFavorites(userId: string){
    try{
      let favorites: WordHistory[] = await DBConnection.connection.all(`SELECT * FROM favorite WHERE user_id = ?`, [userId]);

      return favorites;
    } catch(error){
      if(error instanceof Error) console.log('Error trying to get favorites', error.message);
      return new Error('Error trying to get favorites');
    }
  }

  async getUserHistory(userId: string){
    try{
      let history: WordHistory[] = await DBConnection.connection.all(`SELECT * FROM history WHERE user_id = ?`, [userId]);

      return history;
    } catch(error){
      if(error instanceof Error) console.log('Error trying to get history', error.message);
      return new Error('Error trying to get history');
    }
  }

  async saveWordInHistory(word: string, userId: string){
    try{
      let history: WordHistory | undefined = await DBConnection.connection.get(`SELECT * FROM history WHERE user_id = ? AND word = ?`, [userId, word]);

      if(history) return;

      await DBConnection.connection.run(`
        INSERT INTO history (user_id, word, added) VALUES (?, ?, ?)
      `, [userId, word, new Date()]);

      return;
    } catch(error){
      if(error instanceof Error) console.log('Error trying to save history', error.message);
      return new Error('Error trying to save history');
    }
  }
}

export default new UserService();