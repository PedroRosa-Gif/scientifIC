import { Request, Response } from "express";
import IScientificResearchApplication from "../interfaces/IScientificResearchApplication";
import ScientificResearchApplicationService from "../services/ScientificResearchApplicationService";
import ScientificResearchApplication from '../models/scientificResearchApplication.model';
import User from '../models/user.model';
import ScientificResearch from '../models/scientificResearch.model';

export const applyToScientificResearch = async (req: Request, res: Response) => {
	const newApplication = req.body as IScientificResearchApplication;

  	const scientificResearchApplicationService = ScientificResearchApplicationService.getInstance(ScientificResearchApplication, User, ScientificResearch);

	const application = await scientificResearchApplicationService.applyToScientificResearch(newApplication);

	res.status(201).send({
    	applicationId: application._id.toString()
	});
}

export const getApplicationsByResearchQuery = async (req: Request, res: Response) => {
	const idResearch = req.query["idResearch"] as string;
	const search = req.query["search"] as string;

	const applicationsService = await ScientificResearchApplicationService.getInstance(ScientificResearchApplication, User, ScientificResearch);

	const applications = await applicationsService.getApplicationsOfResearch(idResearch, search);

	return res.status(200).send(applications);
}