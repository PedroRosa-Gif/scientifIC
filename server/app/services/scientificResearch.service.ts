import { Model } from "mongoose";
import IFiltersScientificResearch from "../interfaces/IFiltersScientificResearch";
import IScientificResearch from "../interfaces/IScientificResearch";
import ScientificResearch from '../models/scientificResearch.model';

const getICs = async ({ search, totalPerPage, currentPage, institute, ...filters}:IFiltersScientificResearch,
                        ScientificResearchModel:Model<IScientificResearch> = ScientificResearch) => {

  const objectFind = {
    $or: [{title: { $regex: `/${search}/i` }},
          {theme: { $regex: `/${search}/i` }}],
    ...filters
  }

  console.log(objectFind);

  const allScientificResearch = await ScientificResearchModel.find(objectFind).limit(totalPerPage).skip(totalPerPage * (currentPage - 1)).sort( '-createdAt' ).exec();

  return allScientificResearch;
}

export const scientificResearchServices = { getICs }
