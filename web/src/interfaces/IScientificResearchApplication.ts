import IUser from "./IUser";

interface IScientificResearchApplication {
  scientificResearchId: string;
  studentId: IUser | string;

  motivation: string;

  createdAt: Date;
};

export default IScientificResearchApplication;