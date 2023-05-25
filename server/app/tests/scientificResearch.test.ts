import mongoose, { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { scientificResearchSchema } from '../models/scientificResearch.model';
import IScientificResearch from '../interfaces/IScientificResearch';
import { scientificResearchServices } from '../services/scientificResearch.service';
import IUser from '../interfaces/IUser';
import { userSchema } from '../models/user.model';
import IFiltersScientificResearch from '../interfaces/IFiltersScientificResearch';

let mongoServer: MongoMemoryServer;
let UserModelMock: Model<IUser>;
let ScientificResearchModelMock: Model<IScientificResearch>;

let scientificResearch1:IScientificResearch;
let scientificResearch2:IScientificResearch;
let scientificResearch3:IScientificResearch;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  await mongoose.connect(uri);
  UserModelMock = mongoose.model<IUser>("User", userSchema);
  ScientificResearchModelMock = mongoose.model("ScientificResearch", scientificResearchSchema);

  await createInstances();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const createInstances = async () => {
  
  const createUser1:IUser = {
    email: "email@gmail.com",
    password: "senha123",
    name: "Usuário",
    lastName: "1",
    ra: "123",
    birthdate: new Date(),
    institute: "Instituto de Computação",
    type: 1
  } 

  const createUser2:IUser = {
    email: "email@gmail.com",
    password: "senha123",
    name: "Usuário",
    lastName: "1",
    ra: "123",
    birthdate: new Date(),
    institute: "Instituto de Biologia",
    type: 1
  } 

  const result1 = await UserModelMock.create(createUser1); 
  const result2 = await UserModelMock.create(createUser2); 
  
  scientificResearch1 = {
    theme: 'Economia de pequeno comercio',
    title: 'Economics',
    abstract: 'Uma pequena pesquisa de como funciona...',
    status: 1,
    dateToBegin: new Date(),
    forecastFinish: new Date(),
    desireSkills: ["ChatGPT"],
    areas: ["Sociedade", "Economia"],
    linkToMore: "",
    scholarShip: 2040.98,
    isShipToDefine: false,
    advisorId: result1._id.toString(),
    studentId: "",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  scientificResearch2 = {
    theme: 'Economia de pequeno comercio',
    title: 'Economics',
    abstract: 'Uma pequena pesquisa de como funciona...',
    status: 1,
    dateToBegin: new Date(),
    forecastFinish: new Date(),
    desireSkills: ["ChatGPT"],
    areas: ["Sociedade", "Engenharia"],
    linkToMore: "",
    scholarShip: 0,
    isShipToDefine: true,
    advisorId: result1._id.toString(),
    studentId: "",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  scientificResearch3 = {
    theme: 'Economia de pequeno comercio',
    title: 'Economics',
    abstract: 'Uma pequena pesquisa de como funciona...',
    status: 1,
    dateToBegin: new Date(),
    forecastFinish: new Date(),
    desireSkills: ["ChatGPT"],
    areas: ["Mecânica", "IA"],
    linkToMore: "",
    scholarShip: 2040.98,
    isShipToDefine: false,
    advisorId: result2._id.toString(),
    studentId: "",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await ScientificResearchModelMock.create(scientificResearch1);
  await ScientificResearchModelMock.create(scientificResearch2);
  await ScientificResearchModelMock.create(scientificResearch3);
}

describe('Get ICs', () => {

  const filtersGetAllICs:IFiltersScientificResearch =  {
    search: "",
    area: [],
    totalPerPage: 6,
    currentPage: 1
  };

  const filtersGetICsFromIC:IFiltersScientificResearch =  {
    search: "",
    institute: "Instituto de Computação",
    area: [],
    totalPerPage: 6,
    currentPage: 1
  };

  const filtersGetICsWithSomeAreas:IFiltersScientificResearch =  {
    search: "",
    totalPerPage: 6,
    area: ["Sociedade", "Area 2"],
    currentPage: 1
  };

  const filtersGetICsWithScholarShip:IFiltersScientificResearch =  {
    search: "",
    area: [],
    totalPerPage: 6,
    isShipToDefine: true,
    currentPage: 1,
    institute: ""
  };

  const filtersGetICsWithSomeAreasFromIC:IFiltersScientificResearch =  {
    search: "",
    totalPerPage: 6,
    institute: "Instituto de Computação",
    area: ["Engenharia", "Area 2"],
    currentPage: 1
  };

  it('Get all created ICs without filters (3)', async () => {

    await expect(scientificResearchServices.getICs(filtersGetAllICs, ScientificResearchModelMock)).resolves.toHaveLength(3);
  });
  
  it('Get ICs from IC (2)', async () => {

    await expect(scientificResearchServices.getICs(filtersGetICsFromIC, ScientificResearchModelMock)).resolves.toHaveLength(2);
  });
  
  it('Get ICs with Area "Sociedade" (2)', async () => {

    await expect(scientificResearchServices.getICs(filtersGetICsWithSomeAreas, ScientificResearchModelMock)).resolves.toHaveLength(2);
  });
  
  it('Get ICs with ScholarShip not defined', async () => {

    await expect(scientificResearchServices.getICs(filtersGetICsWithScholarShip, ScientificResearchModelMock)).resolves.toHaveLength(1);
  });

  it('Get ICs with Area "Sociedade" (1) and from IC', async () => {

    await expect(scientificResearchServices.getICs(filtersGetICsWithSomeAreasFromIC, ScientificResearchModelMock)).resolves.toHaveLength(1);
  });
})