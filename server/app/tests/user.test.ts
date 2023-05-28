import mongoose, { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import IUser from '../interfaces/IUser';
import { userSchema } from '../models/user.model';
import UserService from '../services/UserService';

let mongoServer: MongoMemoryServer;
let UserModelMock: Model<IUser>;
let userService:UserService;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  await mongoose.connect(uri);
  UserModelMock = mongoose.model<IUser>("User", userSchema);

  userService = UserService.getInstance(UserModelMock);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const createUser1:IUser = {
  email: "email@gmail.com",
  password: "senha123",
  name: "Usuário",
  lastName: "1",
  ra: "123",
  birthdate: new Date(),
  institute: "Instituto de Computação",
  type: 1,
  interestAreas: []
} 

const createUser2:IUser = {
  email: "email@gmail.com",
  password: "senha123",
  name: "Usuário",
  lastName: "2",
  ra: "123",
  birthdate: new Date(),
  type: 1,
  institute: "",
  interestAreas: []
} 

const loginUser1:IUser = {
  email: "email@gmail.com",
  password: "$2b$10$cWerPZquf0hiQR8ZCix8/u75iR2MUVKq.SFPvCywSAljkXj9bWvxy",
  name: "Usuário",
  lastName: "1",
  ra: "123",
  birthdate: new Date(),
  type: 1,
  institute: "",
  interestAreas: []
}

describe('Create User', () => {
  
  afterEach(async () => {
    await UserModelMock.deleteMany({});
  })

  it('E-mail already registered', async () => {

    await UserModelMock.create(createUser1);
    await expect(userService.create(createUser2)).rejects.toThrowError("Email já cadastrado");
  })

  it('User created successfully', async () => {

    await expect(userService.create(createUser1)).resolves.toEqual(undefined);
  })
})

describe('Login User', () => {

  afterEach(async () => {
    await UserModelMock.deleteMany({});
  })

  it('E-mail not registred', async () => {

    await UserModelMock.create(loginUser1);
    await expect(userService.login("emailNaoexistente", "user.password")).rejects.toThrowError("Email não cadastrado!");
  })

  it('Incorrect password', async () => {

    await UserModelMock.create(loginUser1);
    await expect(userService.login(loginUser1.email, "asdasd")).rejects.toThrowError("Senha incorreta!");
  })

  it('Login Success', async () => {

    await UserModelMock.create(loginUser1);
    await expect(userService.login(loginUser1.email, "string")).resolves.not.toThrow();
  })
})