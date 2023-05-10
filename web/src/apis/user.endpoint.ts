import axios from "axios";
import IUser from "../interfaces/IUser";

export const handleLogin = async (email:string, password:string) => {

    try {
        const res = await axios.post("http://localhost:8000/user/login", {
            email: email,
            password: password,
        });

        return res;
        
    } catch (error) {
       console.log(error);
    }
}

export const createUser = async (userInfos:IUser) => {

    try {
        const res = await axios.post("http://localhost:8000/user/create", userInfos);
        return res;
    } catch (error) {
       console.log(error);
    }
}