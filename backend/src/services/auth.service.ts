import md5 from 'md5';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import DBConnection from "../database/DBConnection";
import User from '../types/User';

class AuthService {
  async createUser(name: string, password: string, email: string) {
    try {
      const userAlreadyCreated = await DBConnection.connection.get(`SELECT * FROM user WHERE email = ?`, [email]);
      if (userAlreadyCreated) {
        return new Error('E-mail already used!');
      }

      const user_id = uuidv4();

      const passwordMd5 = md5(password);
      await DBConnection.connection.run(`
        INSERT INTO user (user_id, name, password, email) VALUES (?, ?, ?, ?)
      `, [user_id, name, passwordMd5, email]);

      return {
        user_id,
        name,
        token: getJwt(user_id)
      }

    } catch (error) {
      if (error instanceof Error) console.log('Error trying to create user', error.message);
      return new Error('Error trying to create user');
    }
  }

  async logIn(email: string, password: string){
    try{
      const passwordMd5 = md5(password);

      const user: User | undefined = await DBConnection.connection.get(`SELECT * FROM user WHERE email = ? AND password = ?`, [email, passwordMd5]);

      if (!user) {
        return new Error('Invalid e-mail or password!');
      }

      return {
        user_id: user.user_id,
        name: user.name,
        token: getJwt(user.user_id)
      }

    } catch (error) {
      if (error instanceof Error) console.log('Error trying to log in', error.message);
      return new Error('Error trying to log in');
    }
  }
}

const getJwt = (userId: string) => {
  const token = jwt.sign({ user_id: userId }, process.env.SECRET ?? "1S3GR3D0H4RD");

  return token;
}

export default new AuthService();