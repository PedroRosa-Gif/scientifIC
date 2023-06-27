import mongoose, { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { scientificResearchSchema } from '../models/scientificResearch.model';
import IScientificResearch from '../interfaces/IScientificResearch';
import IUser from '../interfaces/IUser';
import { userSchema } from '../models/user.model';
import IFiltersScientificResearch from '../interfaces/IFiltersScientificResearch';
import ScientificResearchService from "../services/ScientificResearchService";
import UserType from '../utils/enums/UserType';
import ResearchStatus from '../utils/enums/ResearchStatus';
import { scientificResearchApplicationSchema } from '../models/scientificResearchApplication.model';
import IScientificResearchApplication from '../interfaces/IScientificResearchApplication';

let mongoServer: MongoMemoryServer;
let UserModelMock: Model<IUser>;
let ScientificResearchApplicationModelMock: Model<IScientificResearchApplication>;
let ScientificResearchModelMock: Model<IScientificResearch>;

let scientificResearch1:IScientificResearch;
let scientificResearch2:IScientificResearch;
let scientificResearch3:IScientificResearch;

let scientificResearchService:ScientificResearchService;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  await mongoose.connect(uri);
  UserModelMock = mongoose.model<IUser>("User", userSchema);
  ScientificResearchApplicationModelMock = mongoose.model<IScientificResearchApplication>("ScientificResearchApplication", scientificResearchApplicationSchema);
  ScientificResearchModelMock = mongoose.model("ScientificResearch", scientificResearchSchema);

  scientificResearchService = ScientificResearchService.getInstance(ScientificResearchModelMock, UserModelMock);

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
    currentPage: 1,
    institute: '',
    status: 0,
    isShipToDefine: ''
  };

  const filtersGetICsFromIC:IFiltersScientificResearch =  {
    search: "",
    institute: "Instituto de Computação",
    area: [],
    totalPerPage: 6,
    currentPage: 1,
    status: 0,
    isShipToDefine: ''
  };

  const filtersGetICsWithSomeAreas:IFiltersScientificResearch =  {
    search: "",
    totalPerPage: 6,
    area: ["Sociedade", "Area 2"],
    currentPage: 1,
    institute: '',
    status: 0,
    isShipToDefine: ''
  };

  const filtersGetICsWithScholarShip:IFiltersScientificResearch =  {
    search: "",
    area: [],
    totalPerPage: 6,
    isShipToDefine: "true",
    currentPage: 1,
    institute: "",
    status: 0
  };

  const filtersGetICsWithSomeAreasFromIC:IFiltersScientificResearch =  {
    search: "",
    totalPerPage: 6,
    institute: "Instituto de Computação",
    area: ["Engenharia", "Area 2"],
    currentPage: 1,
    status: 0,
    isShipToDefine: ''
  };

  it('Get all created ICs without filters (3)', async () => {

    await expect(scientificResearchService.getICs(filtersGetAllICs)).resolves.toHaveLength(3);
  });
  
  it('Get ICs from IC (2)', async () => {

    await expect(scientificResearchService.getICs(filtersGetICsFromIC)).resolves.toHaveLength(2);
  });
  
  it('Get ICs with Area "Sociedade" (2)', async () => {

    await expect(scientificResearchService.getICs(filtersGetICsWithSomeAreas)).resolves.toHaveLength(2);
  });
  
  it('Get ICs with ScholarShip not defined', async () => {

    await expect(scientificResearchService.getICs(filtersGetICsWithScholarShip)).resolves.toHaveLength(1);
  });

  it('Get ICs with Area "Sociedade" (1) and from IC', async () => {

    await expect(scientificResearchService.getICs(filtersGetICsWithSomeAreasFromIC)).resolves.toHaveLength(1);
  });
});

describe('Create Scientific Research', () => {

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
  
	beforeEach(async () => {
		await UserModelMock.create(teacher);

		let advisor = await UserModelMock.findOne({ email: teacher.email });
		scientificResearch.advisorId = advisor?._id.toString()!;
	})

	afterEach(async () => {
		await UserModelMock.deleteMany({});
		await ScientificResearchModelMock.deleteMany({});
	});

	it('Research Without Advisor', async () => {
		let newResearchWithoutAdvisor: IScientificResearch = {
      ...scientificResearch,
      advisorId: ""
		};

		await expect(scientificResearchService.create(newResearchWithoutAdvisor)).rejects.toThrowError("Nenhum professor foi assignado a esta IC");
	})

	it('Research With Invalid User', async () => {
		let newResearchChangeId: IScientificResearch = {
      ...scientificResearch,
      advisorId: mongoose.Types.ObjectId.createFromHexString("64640b6dad525134b38f0293").toString()
		};
		
		await expect(scientificResearchService.create(newResearchChangeId)).rejects.toThrowError("O orientador não existe");
	})

	it('Research Created by Student', async () => {
		await UserModelMock.create(student);

		let auxAdvisor = await UserModelMock.findOne({ email: student.email });

		let newResearchForTestStudent: IScientificResearch = {
      ...scientificResearch,
      advisorId: auxAdvisor?._id.toString()!
		};

		await expect(scientificResearchService.create(newResearchForTestStudent)).rejects.toThrowError("O usuário é um ALUNO e não pode criar uma IC");
	})

	it('Research Without Theme', async () => {
		let newResearchTheme: IScientificResearch = {
				...scientificResearch,
				theme: ""
		};
		await expect(scientificResearchService.create(newResearchTheme)).rejects.toThrowError("É necessário inserir um tema para a pesquisa");
	})

	it('Research Without Defined ScholarShip', async () => {
		let newResearchScholarShip: IScientificResearch = {
      ...scientificResearch,
      scholarShip: 0.0,
      isShipToDefine: false
		};
		
		await expect(scientificResearchService.create(newResearchScholarShip)).rejects.toThrowError("O valor da bolsa deve ser inserido, se não possuir valor definido, selecione A DEFINIR");
	})

	it('Research create successfully', async () => {
		await expect(scientificResearchService.create(scientificResearch)).resolves.not.toThrow();
	});
});

describe('Assign to Student', () => {
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

  const applicationToResearch: IScientificResearchApplication = {
    createdAt: new Date(),
    motivation: 'TEste',
    scientificResearchId: "",
    studentId: ""
  }


  
	beforeEach(async () => {
		await UserModelMock.create(teacher);
    const createdStudent = await UserModelMock.create(student);

		let advisor = await UserModelMock.findOne({ email: teacher.email });
		scientificResearch.advisorId = advisor?._id.toString()!;

    teacher._id = advisor?._id.toString()!;

    const research = await ScientificResearchModelMock.create(scientificResearch);

    applicationToResearch.scientificResearchId = research._id.toString();
    applicationToResearch.studentId = createdStudent._id?.toString()!;

    student._id = createdStudent._id.toString();

    await ScientificResearchApplicationModelMock.create(applicationToResearch);
	})

	afterEach(async () => {
		await UserModelMock.deleteMany({});
    await ScientificResearchApplicationModelMock.deleteMany({});
		await ScientificResearchModelMock.deleteMany({});
	});

  it('Assign with student account', async () => {
		await expect(scientificResearchService.assignStudent(applicationToResearch.scientificResearchId, applicationToResearch.studentId, student._id!)).rejects.toThrowError("Você não possui acesso a essa IC");
	});

  it('Assign a teacher to research', async () => {
		let newApplication: IScientificResearchApplication = {
				...applicationToResearch,
				studentId: teacher._id!
		};
		await expect(scientificResearchService.assignStudent(newApplication.scientificResearchId, newApplication.studentId, teacher._id!)).rejects.toThrowError("Não é possível selecionar este usuário. Seu cadastro consta como professor");
	});

  it('Assign successfully', async () => {
		await expect(scientificResearchService.assignStudent(applicationToResearch.scientificResearchId, applicationToResearch.studentId, teacher._id!)).resolves.not.toThrow();
	});
})