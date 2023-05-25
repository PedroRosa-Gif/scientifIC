import { Request, Response } from "express";
import IFiltersScientificResearch from "../interfaces/IFiltersScientificResearch";
import { scientificResearchServices } from "../services/scientificResearch.service";

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
  

  const allScientificResearch = await scientificResearchServices.getICs(filters);

  res.status(200).send({
    allScientificResearch
  });
}
