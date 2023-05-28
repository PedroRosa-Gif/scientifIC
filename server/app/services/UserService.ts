import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import { Model } from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

class UserService {
  private static instance: UserService;
  private UserModel:Model<IUser>

  private constructor(UserModel:Model<IUser>) {
    this.UserModel = UserModel
  }

  public static getInstance(UserModel:Model<IUser>): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService(UserModel);
    }

    return UserService.instance;
  }
  
  async create (infos:IUser){
    const user = await this.UserModel.findOne({ email: infos.email });
    
    if (user !== null) {
      throw new Error("Email já cadastrado");
    }

    const passwordCrypted = await bcrypt.hash(infos.password, 10);
    infos.password = passwordCrypted;

    await this.UserModel.create(infos);
  }

  async findByEmail(email: string){
    return await this.UserModel.findOne({ "email": email });
  }

  async findById (id: string){
    return await this.UserModel.findById(id);
  }

  async login (email:string, password:string){
      const user = await this.UserModel.findOne({ "email": email });
      
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
          institute: user.institute,
          type: user.type,
      },
      process.env.JWT_KEY || "senha123",
      {
          expiresIn: "1h",
      });

      let userInfos = JSON.parse(JSON.stringify(user));
      delete userInfos.password;
    
      return { userInfos: userInfos, message: "Login realizado com sucesso!", token: token };
  }
}


export default UserService;