import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Model } from "mongoose";
import IUser from "../interfaces/IUser";
import IScientificResearch from "../interfaces/IScientificResearch";
import IScientificResearchEvent from "../interfaces/IScientificResearchEvent";
import { userSchema } from "../models/user.model";
import { scientificResearchEventSchema } from "../models/scientificResearchEvent.model";
import { scientificResearchSchema } from "../models/scientificResearch.model";
import ScientificResearchEventService from "../services/ScientificResearchEventService";
import UserType from "../utils/enums/UserType";

let mongoServer: MongoMemoryServer;
let UserModelMock: Model<IUser>;
let ScientificResearchModelMock: Model<IScientificResearch>;
let ScientificResearchEventModelMock: Model<IScientificResearchEvent>;

let createUser1:IUser;
let createUser2:IUser;
let scientificResearch1: IScientificResearch;
let event1: IScientificResearchEvent;

let scientificResearchEventService: ScientificResearchEventService;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  await mongoose.connect(uri);
  UserModelMock = mongoose.model<IUser>("User", userSchema);
  ScientificResearchEventModelMock = mongoose.model<IScientificResearchEvent>("ScientificResearchEvent", scientificResearchEventSchema);
  ScientificResearchModelMock = mongoose.model("ScientificResearch", scientificResearchSchema);

  scientificResearchEventService = ScientificResearchEventService.getInstance(ScientificResearchEventModelMock, UserModelMock, ScientificResearchModelMock);

  await createInstances();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const createInstances = async () => {
	
	createUser1 = {
    email: "email@gmail.com",
    password: "senha123",
    name: "Usuário",
    lastName: "1",
    ra: "123",
    birthdate: new Date(),
    institute: "Instituto de Computação",
    type: UserType.Teacher
  } 

  createUser2 = {
    email: "email@gmail.com",
    password: "senha123",
    name: "Usuário",
    lastName: "1",
    ra: "123",
    birthdate: new Date(),
    institute: "Instituto de Biologia",
    type: UserType.Student
  } 

  createUser1 = await UserModelMock.create(createUser1); 
  createUser2 = await UserModelMock.create(createUser2); 

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
		isCanceled: false,
		advisorId: createUser1._id!.toString(),
		studentId: createUser2._id!.toString(),
		createdAt: new Date(),
		updatedAt: new Date()
	};

	const research1 = await ScientificResearchModelMock.create(scientificResearch1);

	event1 = {
		title: "Teste",
		content: "Teste conteudo",
		idResearch: research1._id.toString(),
		createdUser: createUser1.name,
		createdAt: new Date()
	}
}


describe('Create Event', () => {

	afterEach(async () => {
		await ScientificResearchEventModelMock.deleteMany({});
	});

	it('No permitted student or teacher and no exists research', async () => {
		let newEvent: IScientificResearchEvent = {
      ...event1,
      idResearch: ""
		};

		await expect(scientificResearchEventService.create(newEvent, "fakeId")).rejects.toThrowError();
	})

	it('Permitted student or teacher and but no exists research', async () => {
		let newEvent: IScientificResearchEvent = {
      ...event1,
      idResearch: ""
		};
		
		await expect(scientificResearchEventService.create(newEvent, createUser1._id!.toString())).rejects.toThrowError();
	})

	it('Exists research and but no permitted student or teacher', async () => {
		await expect(scientificResearchEventService.create(event1, "fakeId")).rejects.toThrowError();
	})

	it('Exists research and permitted student or teacher', async () => {
		await expect(scientificResearchEventService.create(event1, createUser2._id!.toString())).resolves.not.toThrowError();
	})
});