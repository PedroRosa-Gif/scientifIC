import { Request, Response } from "express";
import { userService } from "../services/user.service";
import IUser from "../interfaces/IUser";

export const create = async (req: Request, res: Response) => {
  const infos = req.body as IUser;
  await userService.create(infos);
  res.status(201).send({
    message: "Cadastro realizado com sucesso!"
  });
}
