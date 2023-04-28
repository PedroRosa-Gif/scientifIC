import axios from "axios";

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