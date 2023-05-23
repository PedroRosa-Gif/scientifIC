import mongoose, { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import IUser from '../interfaces/IUser';
import { userSchema } from '../models/user.model';
import { userService } from '../services/user.service';
import { createUser1, createUser2, loginUser1 } from './fakeObjects/user.fakeObjects';

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

describe('Create User', () => {
  
  afterEach(async () => {
    await UserModelMock.deleteMany({});
  })

  it('E-mail already registered', async () => {

    await UserModelMock.create(createUser1);
    await expect(userService.create(createUser2, UserModelMock)).rejects.toThrowError("Email já cadastrado");
  })

  it('User created successfully', async () => {

    await expect(userService.create(createUser1, UserModelMock)).resolves.toEqual(undefined);
  })
})

describe('Login User', () => {

  afterEach(async () => {
    await UserModelMock.deleteMany({});
  })

  it('E-mail not registred', async () => {

    await UserModelMock.create(loginUser1);
    await expect(userService.login("emailNaoexistente", "user.password", UserModelMock)).rejects.toThrowError("Email não cadastrado!");
  })

  it('Incorrect password', async () => {

    await UserModelMock.create(loginUser1);
    await expect(userService.login(loginUser1.email, "asdasd", UserModelMock)).rejects.toThrowError("Senha incorreta!");
  })

  it('Login Success', async () => {

    await UserModelMock.create(loginUser1);
    await expect(userService.login(loginUser1.email, "string", UserModelMock)).resolves.not.toThrow();
  })
})