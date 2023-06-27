import IUser from "../interfaces/IUser";
import axiosInstance from "./axiosInstance";

export const handleLogin = async (email:string, password:string) => {
    const res = await axiosInstance.post("/user/login", {
      email: email,
      password: password,
    });

    return res;
}

export const createUser = async (userInfos:IUser) => {

  const res = await axiosInstance.post("/user/create", userInfos);
  return res;
}

export const editUser = async (id:string, userInfos:IUser) => {

  const res = await axiosInstance.put("/user/edit", {
    id: id,
    userInfos: userInfos
  });

  return res;
}

export const checkAutentication = async (token:string) => {

  const res = await axiosInstance.get("/user/checkAuthorization");
  
  return res;
}