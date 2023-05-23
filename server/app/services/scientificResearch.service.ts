import { Model } from "mongoose";
import IFiltersScientificResearch from "../interfaces/IFiltersScientificResearch";
import IScientificResearch from "../interfaces/IScientificResearch";
import ScientificResearch from '../models/scientificResearch.model';

const getICs = async (filters:IFiltersScientificResearch, ScientificResearchModel:Model<IScientificResearch> = ScientificResearch) => {

  const search = filters.search;
  const totalPerPage = filters.totalPerPage;
  const currentPage = filters.currentPage;

  const allScientificResearch = await ScientificResearchModel.find({
    $or: [{title: { $regex: `/${search}/i` }},
          {theme: { $regex: `/${search}/i` }}],
    institute: filters.institute,
    status: filters.status,
    scholarShip: filters.scholarShip,
    area: filters.area,
      
  }).limit(totalPerPage).skip(totalPerPage * (currentPage - 1)).sort( '-createdAt' ).exec();

  return allScientificResearch;
}

export const scientificResearchServices = { getICs }
