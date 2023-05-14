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

export const login = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const result = await userService.login(email, password);

    res.status(200).send({
        token: result.token || "",
        message: result.message,
        userInfos: result.userInfos
    });
}
