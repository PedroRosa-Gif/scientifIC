import mongoose from "mongoose";

interface IScientificResearch {
  theme: string;
  title: string;
  linkToMore: string;
  abstract: string;
  status: number; // Pré Cadastrado

  scholarShip: number;
  isShipToDefine: boolean;

  dateToBegin: Date;
  forecastFinish: Date;

  desireSkills: string[];
  areas: string[];

  createdAt: Date;
  updatedAt: Date;

  // RelashionShip columns
  advisorId: mongoose.Schema.Types.ObjectId;
  studentId: string;
};

export default IScientificResearch