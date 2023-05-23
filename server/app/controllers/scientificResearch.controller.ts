import { Request, Response } from "express";
import IFiltersScientificResearch from "../interfaces/IFiltersScientificResearch";
import { scientificResearchServices } from "../services/scientificResearch.service";

export const getICs = async (req:Request, res:Response) => {

  const filters = req.body as IFiltersScientificResearch;
  const allScientificResearch = await scientificResearchServices.getICs(filters);

  res.status(200).send({
    allScientificResearch
  });
}
