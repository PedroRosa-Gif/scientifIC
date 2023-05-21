import mongoose, { Schema } from "mongoose";
import IScientificResearch from "../interfaces/IScientificResearch";
import { Decimal128 } from "mongodb";

export const ScientificResearchSchema = new Schema<IScientificResearch>({
    theme: { type: String, required: true },
    title: { type: String },
    linkToMore: { type: String },
    summary: { type: String, required: true },
    status: { type: Number, required: true }, // Pré cadastrado

    scholarShip: { type: Decimal128 },
    isShipToDefine: { type: Boolean, required: true },

    dateToBegin: { type: Date, required: true },
    forecastFinish: { type: Date, required: true },

    desireSkills: { type: [String], required: true },
    areas: { type: [String], required: true },

    createdAt: { type: Date },
    createdBy: { type: String },
    updateAt: { type: Date },
    updateBy: { type: String },

    teacherId: { type: Number, required: true },
    studentId: { type: Number }
});

const ScientificResearch = mongoose.model<IScientificResearch>("ScientificResearch", ScientificResearchSchema);

export default ScientificResearch;