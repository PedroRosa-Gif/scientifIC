import IUser from '../interfaces/IUser';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

const create = async (infos:IUser) => {
    try {

        const password = infos.password;
        const passwordCrypted = await bcrypt.hash(password, 10);

        infos.password = passwordCrypted;

        await User.create(infos);
    } catch (error) {
        console.log(error);
    }
}

export const userService = {create}