import mongoose, { Schema } from "mongoose";
import IScientificResearch from "../interfaces/IScientificResearch";
import { Decimal128 } from "mongodb";

export const scientificResearchSchema = new Schema<IScientificResearch>({
  theme: { type: String, required: true },
  title: { type: String },
  linkToMore: { type: String },
  abstract: { type: String, required: true },
  status: { type: Number, required: true }, // Pré cadastrado

  scholarShip: { type: Number },
  isShipToDefine: { type: Boolean, required: true },

  dateToBegin: { type: Date, required: true },
  forecastFinish: { type: Date },

  desireSkills: { type: [String], required: true },
  areas: { type: [String], required: true },

  createdAt: { type: Date },
  updatedAt: { type: Date },

  advisorId: { type: String, required: true },
  studentId: { type: String }
});

const ScientificResearch = mongoose.model<IScientificResearch>("ScientificResearch", scientificResearchSchema);

export default ScientificResearch;