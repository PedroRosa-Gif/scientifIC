import { MongoMemoryServer } from "mongodb-memory-server";
import IScientificResearch from "../interfaces/IScientificResearch";
import IScientificResearchApplication from "../interfaces/IScientificResearchApplication";
import IUser from "../interfaces/IUser";
import ResearchStatus from "../utils/enums/ResearchStatus";
import UserType from "../utils/enums/UserType";
import mongoose, { Model } from "mongoose";
import { userSchema } from "../models/user.model";
import { scientificResearchSchema } from "../models/scientificResearch.model";
import { scientificResearchApplicationSchema } from "../models/scientificResearchApplication.model";
import { scientificResearchApplicationService } from "../services/scientificResearchApplication.service";

let mongoServer: MongoMemoryServer;
let UserModelMock: Model<IUser>;
let ScientificResearchModelMock: Model<IScientificResearch>;
let ScientificResearchApplicationModelMock: Model<IScientificResearchApplication>;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  await mongoose.connect(uri);
  UserModelMock = mongoose.model<IUser>("User", userSchema);
  ScientificResearchModelMock = mongoose.model("ScientificResearch", scientificResearchSchema);
  ScientificResearchApplicationModelMock = mongoose.model("ScientificResearchApplication", scientificResearchApplicationSchema);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Apply to a Scientific Research', () => {
  
  const teacher:IUser = {
    email: "teacher@gmail.com",
    password: "senha123",
    name: "Usuário",
    lastName: "2",
    ra: "123",
    birthdate: new Date(),
    type: UserType.Teacher,
    institute: ''
  };
  
  const student:IUser = {
    email: "student@gmail.com",
    password: "senha123",
    name: "Usuário",
    lastName: "2",
    ra: "123",
    birthdate: new Date(),
    type: UserType.Student,
    institute: ''
  };
  
  const scientificResearch: IScientificResearch = {
    theme: 'Economia de pequeno comercio',
    title: 'Economics',
    abstract: 'Uma pequena pesquisa de como funciona...',
    status: ResearchStatus.acceptingStudents,
    dateToBegin: new Date(),
    forecastFinish: new Date(),
    desireSkills: ["ChatGPT"],
    areas: ["Sociedade", "Economia"],
    linkToMore: "",
    scholarShip: 2040.98,
    isShipToDefine: false,
    advisorId: "",
    studentId: "",
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const newApplication:IScientificResearchApplication = {
    scientificResearchId: "",
    studentId: "",
    motivation: "minha motivação",
    createdAt: new Date()
  }

	beforeEach(async () => {
		const teacherInfos = await UserModelMock.create(teacher);
		scientificResearch.advisorId = teacherInfos._id.toString();

		const studentInfos = await UserModelMock.create(student);
		newApplication.studentId = studentInfos._id.toString();

    const scientificResearchInfos = await ScientificResearchModelMock.create(scientificResearch);
    newApplication.scientificResearchId = scientificResearchInfos._id.toString();
	})

	afterEach(async () => {
		await UserModelMock.deleteMany({});
		await ScientificResearchModelMock.deleteMany({});
	});

	it('Application Without Scientific Research', async () => {
		let newApplicationWithoutScientificResearch: IScientificResearchApplication = {
      ...newApplication,
      scientificResearchId: "644297a14c4aaac33ca2daff"
		};

		await expect(scientificResearchApplicationService.applyToScientificResearch(newApplicationWithoutScientificResearch, ScientificResearchApplicationModelMock)).rejects.toThrowError("A iniciação científica não existe");
	});

  it('Application Without Student', async () => {
		let newApplicationWithoutStudent: IScientificResearchApplication = {
      ...newApplication,
      studentId: "644297a14c4aaac33ca2daff"
		};

		await expect(scientificResearchApplicationService.applyToScientificResearch(newApplicationWithoutStudent, ScientificResearchApplicationModelMock)).rejects.toThrowError("O estudante não existe");
	});
  
  it('Application with Scientific Research not accpetion new students', async () => {

    const scientificResearchInfos = await ScientificResearchModelMock.create({
      ...scientificResearch,
      status: ResearchStatus.initialStep
    });
    newApplication.scientificResearchId = scientificResearchInfos._id.toString();

		await expect(scientificResearchApplicationService.applyToScientificResearch(newApplication, ScientificResearchApplicationModelMock)).rejects.toThrowError("A iniciação científica não está mais aceitando estudantes");
	});

  it('Application created sucess', async () => {

		await expect(scientificResearchApplicationService.applyToScientificResearch(newApplication, ScientificResearchApplicationModelMock)).resolves.not.toThrow();
	});
});