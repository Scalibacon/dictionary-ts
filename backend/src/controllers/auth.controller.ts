import { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController{
  async createUser(request: Request, response: Response){
    const name: string = request.body.name;
    const email: string = request.body.email;
    const password: string = request.body.password;

    const createdUser = await authService.createUser(name, password, email);

    if (createdUser instanceof Error) {
      return response.status(400).json({ message: createdUser.message });
    } 

    return response.status(201).json(createdUser);
  }

  async logIn(request: Request, response: Response){
    const email: string = request.body.email;
    const password: string = request.body.password;

    const loggedUser = await authService.logIn(email, password);

    if (loggedUser instanceof Error) {
      return response.status(400).json({ message: loggedUser.message });
    } 

    return response.status(200).json(loggedUser);
  }

  fetchUserProfile(request: Request, response: Response){
    // busca os dados do usuário logado
  }

  fetchUserHistory(request: Request, response: Response){
    // busca o histórico de palavras acessadas pelo usuário
  }

  fetchUserFavorites(request: Request, response: Response){
    // busca as palavras favoritas do usuário
  }
}

export default new AuthController();