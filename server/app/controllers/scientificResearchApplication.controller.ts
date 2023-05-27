import { Request, Response } from "express";
import IScientificResearchApplication from "../interfaces/IScientificResearchApplication";
import { scientificResearchApplicationService } from "../services/scientificResearchApplication.service";

export const applyToScientificResearch = async (req: Request, res: Response) => {
	const newApplication = req.body as IScientificResearchApplication;

	const application = await scientificResearchApplicationService.applyToScientificResearch(newApplication);

	res.status(201).send({
    applicationId: application._id.toString()
	});
}