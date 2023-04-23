import { Model } from 'mongoose';
import IUser from '../interfaces/IUser';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

const create = async (infos:IUser, UserModel:Model<IUser> = User) => {
  const user = await UserModel.findOne({ email: infos.email });
  
  if (user !== null) {
    throw new Error("Email já cadastrado");
  }

  const passwordCrypted = await bcrypt.hash(infos.password, 10);
  infos.password = passwordCrypted;

  await UserModel.create(infos);
}

export const userService = {create}