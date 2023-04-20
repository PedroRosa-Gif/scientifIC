import IUser from "../interfaces/IUser";
import { userService } from "../services/user.service";

const create = async (infos:IUser) => {
    await userService.create(infos);
}

export const userController = {create}
