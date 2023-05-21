import { Decimal128 } from "mongoose";

interface IScientificResearch {
    theme: string;
    title?: string;
    linkToMore: string;
    summary: string;
    status: number; // Pré Cadastrado

    scholarShip?: Decimal128;
    isShipToDefine: boolean;

    dateToBegin: Date;
    forecastFinish: Date;

    desireSkills: string[];
    areas: string[];

    createdAt: Date;
    createdBy: string;
    updateAt: Date;
    updateBy: string;

    // RelashionShip columns
    teacherId: number;
    studentId?: number;
}

export default IScientificResearch;