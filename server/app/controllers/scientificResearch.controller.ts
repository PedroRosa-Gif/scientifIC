import { Request, Response } from "express";
import IFiltersScientificResearch from "../interfaces/IFiltersScientificResearch";
import ScientificResearchService from "../services/scientificResearch.service";
import IScientificResearch from "../interfaces/IScientificResearch";
import ScientificResearch from '../models/scientificResearch.model';
import User from "../models/user.model";
import UserService from "../services/UserService";

export const getICs = async (req:Request, res:Response) => {

  const query = req.query;
  const area = (query.area as string);

  const filters:IFiltersScientificResearch = {
    search: query.search as string,
    institute: query.institute as string,
    status: parseInt(query.status as string),
    isShipToDefine: query.isShipToDefine as string,
    area: area ? area.split(';') : [],
    totalPerPage: parseInt(query.totalPerPage as string),
    currentPage: parseInt(query.currentPage as string)
  }

  const scientificResearchService = ScientificResearchService.getInstance(ScientificResearch, User);

  const allScientificResearch = await scientificResearchService.getICs(filters);

  res.status(200).send({
    allScientificResearch
  });
}

export const getThemes = async (req: Request, res: Response) => {
  const scientificResearchService = ScientificResearchService.getInstance(ScientificResearch, User);
	const themes = await scientificResearchService.getThemes();

	res.status(201).send(themes);
}

export const create = async (req: Request, res: Response) => {

  const scientificResearchService = ScientificResearchService.getInstance(ScientificResearch, User);
  const userService = UserService.getInstance(User);

	const newResearch = req.body as IScientificResearch;

	const user = await userService.findByEmail(newResearch.advisorId);

	newResearch.advisorId = user?._id.toString()!;

	const createdResearch = await scientificResearchService.create(newResearch);

	res.status(201).send({
		researchId: createdResearch._id.toString()
	});
}
