import mongoose, { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import IUser from '../interfaces/IUser';
import { userSchema } from '../models/user.model';
import { userService } from '../services/user.service';

let mongoServer: MongoMemoryServer;
let UserModelMock: Model<IUser>;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  await mongoose.connect(uri);
  UserModelMock = mongoose.model<IUser>("User", userSchema);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Login User', () => {
  
  const user:IUser = {
    email: "email@gmail.com",
    password: "$2b$10$cWerPZquf0hiQR8ZCix8/u75iR2MUVKq.SFPvCywSAljkXj9bWvxy",
    name: "Usuário",
    lastName: "1",
    ra: "123",
    birthdate: new Date(),
    type: 1
  }

  afterEach(async () => {
    await UserModelMock.deleteMany({});
  })

  it('E-mail not registred', async () => {

    await UserModelMock.create(user);
    await expect(userService.login("emailNaoexistente", "user.password", UserModelMock)).rejects.toThrowError("Email não cadastrado!");
  })

  it('Incorrect password', async () => {

    await UserModelMock.create(user);
    await expect(userService.login(user.email, "asdasd", UserModelMock)).rejects.toThrowError("Senha incorreta!");
  })

  it('Login Success', async () => {

    await UserModelMock.create(user);
    await expect(userService.login(user.email, "string", UserModelMock)).resolves.not.toThrow();
  })
})
