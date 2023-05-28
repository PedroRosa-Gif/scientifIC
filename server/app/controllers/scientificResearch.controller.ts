import { Request, Response } from "express";
import IFiltersScientificResearch from "../interfaces/IFiltersScientificResearch";
import ScientificResearchService from "../services/ScientificResearchService";
import IScientificResearch from "../interfaces/IScientificResearch";
import ScientificResearch from '../models/scientificResearch.model';
import User from "../models/user.model";
import UserService from "../services/UserService";
import ScientificResearchApplicationService from "../services/ScientificResearchApplicationService";
import ScientificResearchApplication from "../models/scientificResearchApplication.model";

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

	res.status(200).send(themes);
}

export const getResearchApplications = async (req: Request, res: Response) => {
  const idResearch = req.query["idResearch"] as string;
  const idUser = req.query["idUser"] as string;
  const search = req.query["search"] as string;
 
  const scientificResearchService = ScientificResearchService.getInstance(ScientificResearch, User);

  const research = await scientificResearchService.findByIdOnlyTeacher(idResearch, idUser);

  const applicationsService = ScientificResearchApplicationService.getInstance(ScientificResearchApplication, User, ScientificResearch);

  const applications = await applicationsService.getApplicationsOfResearch(idResearch, search);

  res.status(200).send({
		research: research,
    applications: applications, 
    count: applications.length
	});
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
