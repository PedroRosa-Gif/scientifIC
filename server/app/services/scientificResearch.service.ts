import { Model } from "mongoose";
import IFiltersScientificResearch from "../interfaces/IFiltersScientificResearch";
import IScientificResearch from "../interfaces/IScientificResearch";
import ScientificResearch from '../models/scientificResearch.model';

const getICs = async ({ search, totalPerPage, currentPage, institute, area, status, isShipToDefine}:IFiltersScientificResearch,
                        ScientificResearchModel:Model<IScientificResearch> = ScientificResearch) => {

  const objectFind:any = {
    $or: [{title: new RegExp(search, "i") },
          {theme: new RegExp(search, "i") }]
  }

  if (area.length > 0 && area.length > 0) 
    objectFind.areas = { $in: area };

  if (status != 0) 
    objectFind.status = status;

  if (isShipToDefine != "") 
    objectFind.isShipToDefine = (isShipToDefine == "true");

  const populate = {
    path: 'advisorId',
    select: 'name lastName email institute',
    match: { institute: new RegExp((institute != undefined) ? institute : "", "i") }
  }

  let allScientificResearch = await ScientificResearchModel.find(objectFind).populate(populate).sort("-updatedAt").exec();

  allScientificResearch = allScientificResearch.filter((ic:IScientificResearch) => {
    if(ic.advisorId !== null)
      return ic;
  })

  const pageIndex = (currentPage - 1) * totalPerPage
  const allICsWithPagination = allScientificResearch.slice(pageIndex, pageIndex + totalPerPage);

  return allICsWithPagination;
}

export const scientificResearchServices = { getICs }
