import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (email:String, password:Buffer) => {
    try {
        const user = await User.findOne({ "email": email });
        
        console.log(user);

        // Checking user
        if (user === null) {
            throw new Error("Email inválido!");
        }

        // Checking password is correct
        bcrypt.compare(password, user.password, (error:Error | undefined, result:boolean) => {
            if (!result) throw new Error("Senha incorreta!");

            if (error) throw new Error("Falha na autenticação!");
        });

        const token = jwt.sign({
            email: user.email,
            password: user.password,
            name: user.name,
            lastName: user.lastName,
            ra: user.ra,
            birthdate: user.birthdate,
            type: user.type,
        },
        process.env.JWT_KEY || "",
        {
            expiresIn: "1h",
        });

        console.log(token);

        return {  message: "Login realizado com sucesso!", type: "success", token: token };
    } catch (error) {
        return {  message: error, type: "error", token: "" };
    }
}

export const userService = {login}
