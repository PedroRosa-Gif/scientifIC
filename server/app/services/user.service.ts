import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import { Model } from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const login = async (email:string, password:string, UserModel:Model<IUser> = User) => {
    const user = await UserModel.findOne({ "email": email });
    
    // Checking user
    if (user === null) {
        throw new Error("Email não cadastrado!");
    }

    // Checking password is correct
    const result = await bcrypt.compare(password, user.password);

    if (!result) throw new Error("Senha incorreta!");

    const token = jwt.sign({
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        ra: user.ra,
        birthdate: user.birthdate,
        type: user.type,
    },
    process.env.JWT_KEY || "senha123",
    {
        expiresIn: "1h",
    });

    return {  message: "Login realizado com sucesso!", token: token };
}

export const userService = {login}
