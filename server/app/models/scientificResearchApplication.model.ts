import mongoose, { Schema } from "mongoose";
import IScientificResearchApplication from "../interfaces/IScientificResearchApplication"

export const scientificResearchApplicationSchema = new Schema<IScientificResearchApplication>({
  scientificResearchId: { type: String, ref: 'ScientificResearch', required: true },
  studentId: { type: String, ref: 'User', required: true  },

  motivation: { type: String, required: true },

  createdAt: { type: Date, required: true }
});

const ScientificResearchApplication = mongoose.model<IScientificResearchApplication>("ScientificResearchApplication", scientificResearchApplicationSchema);

export default ScientificResearchApplication;