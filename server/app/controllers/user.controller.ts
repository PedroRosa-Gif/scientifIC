import User from '../models/user.model';
import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import UserService from '../services/UserService';

export const create = async (req: Request, res: Response) => {
  const infos = req.body as IUser;

  const userService = UserService.getInstance(User);

  await userService.create(infos);
  res.status(201).send({
    message: "Cadastro realizado com sucesso!"
  });
}

export const login = async (req:Request, res:Response) => {
    const { email, password } = req.body;

    const userService = UserService.getInstance(User);
    
    const result = await userService.login(email, password);

    res.status(200).send({
        token: result.token || "",
        message: result.message,
        userInfos: result.userInfos
    });
}

export const edit = async (req:Request, res:Response) => {
  const { id, userInfos } = req.body;

  const userService = UserService.getInstance(User);

  await userService.edit(id, userInfos);
  res.status(200).send({
    message: "Edição de perfil concluída!",
  })
}
