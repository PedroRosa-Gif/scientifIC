import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  try {
    const decode = jwt.verify(req.headers.authorization!, process.env.JWT_KEY || "senha123");

    console.log(decode);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      error,
      message: "Falha na autenticação"
    })
  }
}