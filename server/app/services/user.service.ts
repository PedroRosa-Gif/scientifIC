import User from '../models/user.model';

const verifyUser = async (email:String, password:String) => {
    try {
        const user = await User.findOne({ "email": email, "password": password });
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const userService = {verifyUser}
