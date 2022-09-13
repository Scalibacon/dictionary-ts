import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userService from "../services/user.service";
import User from "../types/User";

class UserController {
  async getUserProfile(request: Request, response: Response) {
    try {
      const token = request.headers['x-access-token'] as string | undefined;

      if (!token) {
        return response.status(400).json({ message: 'No token provided!' });
      }

      const decodedToken = jwt.verify(token, process.env.SECRET || "1S3GR3D0H4RD") as User;

      const user = await userService.getUserProfile(decodedToken.user_id);

      if (user instanceof Error) {
        return response.status(400).json({ message: user.message });
      }

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({ message: "Invalid token!" });
    }
  }

  async getUserFavorites(request: Request, response: Response){
    try {
      const token = request.headers['x-access-token'] as string | undefined;

      if (!token) {
        return response.status(400).json({ message: 'No token provided!' });
      }

      const decodedToken = jwt.verify(token, process.env.SECRET || "1S3GR3D0H4RD") as User;

      const favorites = await userService.getUserFavorites(decodedToken.user_id);

      if (favorites instanceof Error) {
        return response.status(400).json({ message: favorites.message });
      }

      return response.status(200).json(favorites);
    } catch (error) {
      return response.status(400).json({ message: "Invalid token!" });
    }
  }

  async getUserHistory(request: Request, response: Response) {
    try {
      const token = request.headers['x-access-token'] as string | undefined;

      if (!token) {
        return response.status(400).json({ message: 'No token provided!' });
      }

      const decodedToken = jwt.verify(token, process.env.SECRET || "1S3GR3D0H4RD") as User;

      const history = await userService.getUserHistory(decodedToken.user_id);

      if (history instanceof Error) {
        return response.status(400).json({ message: history.message });
      }

      return response.status(200).json(history);
    } catch (error) {
      return response.status(400).json({ message: "Invalid token!" });
    }
  }
}

export default new UserController();