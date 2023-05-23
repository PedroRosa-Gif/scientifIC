import mongoose, { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { scientificResearchSchema } from '../models/scientificResearch.model';
import IScientificResearch from '../interfaces/IScientificResearch';
import { scientificResearchServices } from '../services/scientificResearch.service';
import IUser from '../interfaces/IUser';
import { userSchema } from '../models/user.model';
import { createUser1 } from './fakeObjects/user.fakeObjects';

let mongoServer: MongoMemoryServer;
let UserModelMock: Model<IUser>;
let ScientificResearchModelMock: Model<IScientificResearch>;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  await mongoose.connect(uri);
  UserModelMock = mongoose.model<IUser>("User", userSchema);
  ScientificResearchModelMock = mongoose.model<IScientificResearch>("ScientificResearch", scientificResearchSchema);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Get ICs', async () => {
  
  const result = await UserModelMock.create(createUser1); 
  
  await ScientificResearchModelMock.create();
  await ScientificResearchModelMock.create();
  await ScientificResearchModelMock.create();
  await ScientificResearchModelMock.create();
  await ScientificResearchModelMock.create();
  await ScientificResearchModelMock.create();

  it('Get all created ICs (6)', async () => {

  })
})