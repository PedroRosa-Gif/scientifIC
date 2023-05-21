import { Decimal128 } from "mongoose";

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
    advisorId: string;
    studentId: string;
};

export default IScientificResearch;