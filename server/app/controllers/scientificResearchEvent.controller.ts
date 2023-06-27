import { Request, Response } from "express";
import IScientificResearchEvent from "../interfaces/IScientificResearchEvent";
import ScientificResearch from "../models/scientificResearch.model";
import ScientificResearchEvent from "../models/scientificResearchEvent.model";
import User from "../models/user.model";
import ScientificResearchEventService from "../services/ScientificResearchEventService";

export const create = async (req: Request, res: Response) => {
	const scientificResearchEventService = ScientificResearchEventService.getInstance(ScientificResearchEvent, User, ScientificResearch);

	const idUser = req.params["idUser"] as string;
	const newEvent = req.body as IScientificResearchEvent;

	await scientificResearchEventService.create(newEvent, idUser);

	res.status(201).send({
		message: "Evento criado com sucesso"
	});
}

export const getAllEventsFromResearch = async (req: Request, res: Response) => {
	const scientificResearchEventService = ScientificResearchEventService.getInstance(ScientificResearchEvent, User, ScientificResearch);

	const idResearch = req.params["idResearch"] as string;

	const events = await scientificResearchEventService.getEventsByResearch(idResearch);

	res.status(200).send({
		events
	});
}