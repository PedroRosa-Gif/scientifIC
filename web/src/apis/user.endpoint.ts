import axios from "axios";
import IUser from "../interfaces/IUser";

export const handleLogin = async (email:string, password:string) => {

  const res = await axios.post("http://localhost:8000/user/login", {
    email: email,
    password: password,
  });

  return res;
}

export const createUser = async (userInfos:IUser) => {

  const res = await axios.post("http://localhost:8000/user/create", userInfos);
  return res;
}

export const editUser = async (id:string, userInfos:IUser) => {
  const res = await axios.put("http://localhost:8000/user/edit", {
    id: id,
    userInfos: userInfos
  });

  return res;
}