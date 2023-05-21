import mongoose, { Model } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import IScientificResearch from "../interfaces/IScientificResearch";
import ScientificResearch, { scientificResearchSchema } from "../models/scientificResearch.model";
import { scientificResearchService } from "../services/scientificResearch.service";
import IUser from "../interfaces/IUser";
import { userSchema } from "../models/user.model";

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
        scientificResearch.advisorId = "";
        await expect(scientificResearchService.create(scientificResearch, ScientificResearchMock)).rejects.toThrowError("Nenhum professor foi assignado a esta IC");
    })

    it('Research Without Theme', async () => {
        scientificResearch.theme = "";
        await expect(scientificResearchService.create(scientificResearch, ScientificResearchMock)).rejects.toThrowError("É necessário inserir um tema para a pesquisa");
    })

    it('Research Without Defined ScholarShip', async () => {
        scientificResearch.scholarShip = 0.0;
        scientificResearch.isShipToDefine = false;
        await expect(scientificResearchService.create(scientificResearch, ScientificResearchMock)).rejects.toThrowError("O valor da bolsa deve ser inserido, se não possuir valor definido, selecione A DEFINIR");
    })

    it('Research create successfully', async () => {
        await expect(scientificResearchService.create(scientificResearch, ScientificResearchMock)).resolves.not.toThrow();
    });
})