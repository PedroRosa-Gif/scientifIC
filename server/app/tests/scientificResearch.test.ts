import mongoose, { Model, ObjectId } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import IScientificResearch from "../interfaces/IScientificResearch";
import ScientificResearch, { scientificResearchSchema } from "../models/scientificResearch.model";
import { scientificResearchService } from "../services/scientificResearch.service";
import IUser from "../interfaces/IUser";
import { userSchema } from "../models/user.model";
import ResearchStatus from "../utils/enums/ResearchStatus";
import UserType from "../utils/enums/UserType";

let mongoServer: MongoMemoryServer;
let UserModelMock: Model<IUser>;
let ScientificResearchMock: Model<IScientificResearch>;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();

	await mongoose.connect(uri);
	UserModelMock = mongoose.model<IUser>("User", userSchema);
	ScientificResearchMock = mongoose.model<IScientificResearch>("ScientificResearch", scientificResearchSchema);
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

describe('Create Scientific Research', () => {
	const teacher:IUser = {
		email: "teacher@gmail.com",
		password: "senha123",
		name: "Usuário",
		lastName: "2",
		ra: "123",
		birthdate: new Date(),
		type: UserType.Teacher
	};

	const student:IUser = {
		email: "student@gmail.com",
		password: "senha123",
		name: "Usuário",
		lastName: "2",
		ra: "123",
		birthdate: new Date(),
		type: UserType.Student
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

	beforeEach(async () => {
		await UserModelMock.create(teacher);

		let advisor = await UserModelMock.findOne({ email: teacher.email });
		scientificResearch.advisorId = advisor?._id.toString()!;
	})

	afterEach(async () => {
		await UserModelMock.deleteMany({});
		await ScientificResearchMock.deleteMany({});
	});

	it('Research Without Advisor', async () => {
		let newResearchWithoutAdvisor: IScientificResearch = {
				...scientificResearch,
				advisorId: ""
		};

		await expect(scientificResearchService.create(newResearchWithoutAdvisor, ScientificResearchMock, UserModelMock)).rejects.toThrowError("Nenhum professor foi assignado a esta IC");
	})

	it('Research With Invalid User', async () => {
		let newResearchChangeId: IScientificResearch = {
				...scientificResearch,
				advisorId: mongoose.Types.ObjectId.createFromHexString("64640b6dad525134b38f0293").toString()
		};
		
		await expect(scientificResearchService.create(newResearchChangeId, ScientificResearchMock, UserModelMock)).rejects.toThrowError("O orientador não existe");
	})

	it('Research Created by Student', async () => {
		await UserModelMock.create(student);

		let auxAdvisor = await UserModelMock.findOne({ email: student.email });

		let newResearchForTestStudent: IScientificResearch = {
				...scientificResearch,
				advisorId: auxAdvisor?._id.toString()!
		};

		await expect(scientificResearchService.create(newResearchForTestStudent, ScientificResearchMock, UserModelMock)).rejects.toThrowError("O usuário é um ALUNO e não pode criar uma IC");
	})

	it('Research Without Theme', async () => {
		let newResearchTheme: IScientificResearch = {
				...scientificResearch,
				theme: ""
		};
		await expect(scientificResearchService.create(newResearchTheme, ScientificResearchMock, UserModelMock)).rejects.toThrowError("É necessário inserir um tema para a pesquisa");
	})

	it('Research Without Defined ScholarShip', async () => {
		let newResearchScholarShip: IScientificResearch = {
				...scientificResearch,
				scholarShip: 0.0,
				isShipToDefine: false
		};
		
		await expect(scientificResearchService.create(newResearchScholarShip, ScientificResearchMock, UserModelMock)).rejects.toThrowError("O valor da bolsa deve ser inserido, se não possuir valor definido, selecione A DEFINIR");
	})

	it('Research create successfully', async () => {
		await expect(scientificResearchService.create(scientificResearch, ScientificResearchMock, UserModelMock)).resolves.not.toThrow();
	});
})