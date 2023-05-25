import { Request, Response } from "express";
import IScientificResearch from "../interfaces/IScientificResearch";
import { scientificResearchService } from "../services/scientificResearch.service";
import { userService } from "../services/user.service";
import IUser from "../interfaces/IUser";

export const getThemes = async (req: Request, res: Response) => {
    const themes = await scientificResearchService.getThemes();

    res.status(201).send(themes);
}

export const create = async (req: Request, res: Response) => {
    const newResearch = req.body as IScientificResearch;

    const user = await userService.findByEmail(newResearch.advisorId);

    newResearch.advisorId = user?._id.toString()!;

    const createdResearch = await scientificResearchService.create(newResearch);

    res.status(201).send({
        researchId: createdResearch._id.toString()
    });
}