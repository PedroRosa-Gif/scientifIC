import IUser from "../../interfaces/IUser"

export const createUser1:IUser = {
  email: "email@gmail.com",
  password: "senha123",
  name: "Usuário",
  lastName: "1",
  ra: "123",
  birthdate: new Date(),
  type: 1
} 

export const createUser2:IUser = {
  email: "email@gmail.com",
  password: "senha123",
  name: "Usuário",
  lastName: "2",
  ra: "123",
  birthdate: new Date(),
  type: 1
} 

export const loginUser1:IUser = {
  email: "email@gmail.com",
  password: "$2b$10$cWerPZquf0hiQR8ZCix8/u75iR2MUVKq.SFPvCywSAljkXj9bWvxy",
  name: "Usuário",
  lastName: "1",
  ra: "123",
  birthdate: new Date(),
  type: 1
}