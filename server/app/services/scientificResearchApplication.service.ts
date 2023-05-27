import { Model } from "mongoose";
import IScientificResearchApplication from "../interfaces/IScientificResearchApplication";
import ScientificResearchApplication from "../models/scientificResearchApplication.model";
import { userService } from "./user.service";
import { scientificResearchService } from "./scientificResearch.service";

const applyToScientificResearch = async (
  newApplication:IScientificResearchApplication, 
  ScientificResearchApplicationModel: Model<IScientificResearchApplication> = ScientificResearchApplication
) => {

  let student = await userService.findById(newApplication.studentId);
  if (student == null) 
    throw new Error("O estudante não existe");

  let scientificResearch = await scientificResearchService.findById(newApplication.scientificResearchId);
  if (scientificResearch == null) 
    throw new Error("A iniciação científica não existe");
  else if(scientificResearch.status != 1)
    throw new Error("A iniciação científica não está mais aceitando estudantes");

  if (newApplication.motivation == "")
    throw new Error("Preencha o campo de motivação");

  return await ScientificResearchApplicationModel.create(newApplication);
}

export const scientificResearchApplicationService = {applyToScientificResearch}