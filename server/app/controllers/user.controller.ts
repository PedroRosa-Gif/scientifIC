import { userService } from "../services/user.service";

const verifyUser = async (email:String, password:String) => {
    return await userService.verifyUser(email, password);
}

export const userController = {verifyUser}