import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import { userService } from "../services/user.service";

export const login = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const result = await userService.login(email, password);

    res.status(200).send({
        token: result.token || "",
        message: result.message,
    });
}