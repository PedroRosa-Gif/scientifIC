import { Model } from "mongoose";
import IScientificResearchApplication from "../interfaces/IScientificResearchApplication";
import ScientificResearchApplication from "../models/scientificResearchApplication.model";

const applyToScientificResearch = async () => {}

const getApplications = async (id:string, ScientificResearchApplicationModel: Model<IScientificResearchApplication> = ScientificResearchApplication) => {
  return await ScientificResearchApplicationModel.find({ studentId: id });
}

export const scientificResearchApplicationService = {applyToScientificResearch, getApplications}