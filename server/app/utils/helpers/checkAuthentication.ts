import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const checkAuthentication = (req: Request, res: Response) => {
  try {
    const decode = jwt.verify(req.headers.authorization!, process.env.JWT_KEY || "senha123");
    console.log(decode);
    res.status(200).send()
  } catch (error) {
    return res.status(200).send({
      error,
      message: "Falha na autenticação"
    })
  }
}