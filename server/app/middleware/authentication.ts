import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";
import IUser from "../interfaces/IUser";

dotenv.config();

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  try {
    const decode = jwt.verify(req.headers.authorization!, process.env.JWT_KEY || "senha123") as IUser;
    
    req.query["idUser"] = decode._id;

    next();
  } catch (error) {
    return res.status(401).send({
      error,
      message: "Falha na autenticação"
    })
  }
}