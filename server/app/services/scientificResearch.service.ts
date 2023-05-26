import { Model } from "mongoose";
import IFiltersScientificResearch from "../interfaces/IFiltersScientificResearch";
import IScientificResearch from "../interfaces/IScientificResearch";
import ScientificResearch from '../models/scientificResearch.model';
import IUser from "../interfaces/IUser";
import User from "../models/user.model";
import { userService } from "./user.service";
import UserType from "../utils/enums/UserType";

const getICs = async ({ search, totalPerPage, currentPage, institute, area, status, isShipToDefine}:IFiltersScientificResearch,
                        ScientificResearchModel:Model<IScientificResearch> = ScientificResearch) => {

  const objectFind:any = {
    $or: [{title: new RegExp(search, "i") },
          {theme: new RegExp(search, "i") }]
  }

  if (area.length > 0 && area.length > 0) 
    objectFind.areas = { $in: area };

  if (status != 0) 
    objectFind.status = status;

  if (isShipToDefine != "") 
    objectFind.isShipToDefine = (isShipToDefine == "true");

  const populate = {
    path: 'advisorId',
    select: 'name lastName email institute',
    match: { institute: new RegExp((institute != undefined) ? institute : "", "i") }
  }

  let allScientificResearch = await ScientificResearchModel.find(objectFind).populate(populate).sort("-updatedAt").exec();

  allScientificResearch = allScientificResearch.filter((ic:IScientificResearch) => {
    if(ic.advisorId !== null)
      return ic;
  })

  const pageIndex = (currentPage - 1) * totalPerPage
  const allICsWithPagination = allScientificResearch.slice(pageIndex, pageIndex + totalPerPage);

  return allICsWithPagination;
}

const create = async (
	newResearch: IScientificResearch, 
	ScientificResearchModel: Model<IScientificResearch> = ScientificResearch, 
	UserModel:Model<IUser> = User
) => {
	let validationMessage = await validateResearch(newResearch, UserModel);

	if (validationMessage.length > 0) throw new Error(validationMessage);

	newResearch.createdAt = new Date();
	newResearch.updatedAt = new Date();

	return await ScientificResearchModel.create(newResearch);
}

const validateResearch = async (
	newResearch: IScientificResearch,
	UserModel:Model<IUser> = User
): Promise<string> => {
	if (newResearch.advisorId == null || newResearch.advisorId.length <= 0) {
		return "Nenhum professor foi assignado a esta IC";
	}

	let advisor = await userService.findById(newResearch.advisorId, UserModel);

	if (advisor == null) {
		return "O orientador não existe";
	}

	if (advisor.type != Number(UserType.Teacher)) {
		return "O usuário é um ALUNO e não pode criar uma IC";
	}

	if (newResearch.theme == null || newResearch.theme.length <= 0) {
		return "É necessário inserir um tema para a pesquisa";
	}

	if (newResearch.isShipToDefine == false && (newResearch.scholarShip == null || newResearch.scholarShip <= 0)) {
		return "O valor da bolsa deve ser inserido, se não possuir valor definido, selecione A DEFINIR";
	}

	return "";
}

const getThemes = (ScientificResearchModel: Model<IScientificResearch> = ScientificResearch) => {
	return ScientificResearchModel.find({}, { theme: 1, _id: 0 }).distinct('theme');
}

export const scientificResearchService = {create, getThemes, getICs};
