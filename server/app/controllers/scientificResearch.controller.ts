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
  console.log(filters);
  

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

  if (research.studentId !== null && research.studentId.length > 0) {
    return res.status(409).send({
      message: "Está IC já tem um aluno assignado"
    });
  }

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

	const createdResearch = await scientificResearchService.create(newResearch);

	res.status(201).send({
		researchId: createdResearch._id.toString()
	});
}

export const getMyICs = async (req: Request, res: Response) => {
  const query = req.query;
  const filter = (query.filter as string);
  const id = (query.id as string);

  const scientificResearchService = ScientificResearchService.getInstance(ScientificResearch, User);

  const allMyScientificResearch = await scientificResearchService.getMyICs(filter, id);

  res.status(200).send({
    allMyScientificResearch: allMyScientificResearch
  });
}

export const assignStudent = async (req: Request, res: Response) => {
  const idResearch = req.params["idResearch"] as string;
  const idAdvisor = req.query["idAdvisor"] as string;
  const idStudent = req.query["idStudent"] as string;

  const scientificResearchService = ScientificResearchService.getInstance(ScientificResearch, User);

  await scientificResearchService.assignStudent(idResearch, idStudent, idAdvisor);

  res.status(201).send({
		message: "IC assignada com sucesso ao aluno"
	});
}
