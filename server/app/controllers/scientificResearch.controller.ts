import { Request, Response } from "express";
import IScientificResearch from "../interfaces/IScientificResearch";
import { scientificResearchService } from "../services/scientificResearch.service";

export const create = async (req: Request, res: Response) => {
    const newResearch = req.body as IScientificResearch;

    await scientificResearchService.create(newResearch);

    res.status(201).send({
        message: "Iniciação Científica criada com sucesso!"
    });
}