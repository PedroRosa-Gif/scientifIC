import IUser from '../interfaces/IUser';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

const create = async (infos:IUser) => {
  const user = await User.findOne({ email: infos.email });
  
  if (user !== null) {
    throw new Error("Email já cadastrado");
  }

  const passwordCrypted = await bcrypt.hash(infos.password, 10);
  infos.password = passwordCrypted;

  await User.create(infos);
}

export const userService = {create}