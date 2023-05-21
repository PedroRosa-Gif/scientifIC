import dotenv from "dotenv";
import IScientificResearch from "../interfaces/IScientificResearch";
import { Model } from "mongoose";
import ScientificResearch from "../models/scientificResearch.model";
import IUser from "../interfaces/IUser";
import User from "../models/user.model";
import { userService } from "./user.service";

dotenv.config();

const create = async (
    newResearch: IScientificResearch, 
    ScientificResearchModel: Model<IScientificResearch> = ScientificResearch, 
    UserModel:Model<IUser> = User
) => {
    let validationMessage = await validateResearch(newResearch, ScientificResearchModel, UserModel);

    if (validationMessage.length > 0) throw new Error(validationMessage);

    newResearch.createdAt = new Date();
    newResearch.updatedAt = new Date();

    await ScientificResearchModel.create(newResearch);
}

const validateResearch = async (
    newResearch: IScientificResearch, 
    ScientificResearchModel: Model<IScientificResearch> = ScientificResearch, 
    UserModel:Model<IUser> = User
): Promise<string> => {
    if (newResearch.advisorId == null || newResearch.advisorId.length <= 0) {
        return "Nenhum professor foi assignado a esta IC";
    }

    let advisor = await userService.findById(newResearch.advisorId, UserModel);

    if (advisor == null) {
        return "O orientador não existe";
    }

    if (advisor.type != UserType.Teacher) {
        return "O usuário é um aluno e não pode criar uma IC";
    }

    if (newResearch.theme == null || newResearch.theme.length <= 0) {
        return "É necessário inserir um tema para a pesquisa";
    }

    if (newResearch.isShipToDefine == false && newResearch.scholarShip == null) {
        return "O valor da bolsa deve ser inserido, se não possuir valor definido, selecione A DEFINIR";
    }

    return "";
}

export const scientificResearchService = {create};