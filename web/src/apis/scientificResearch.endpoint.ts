import axios from "axios";
import IScientificResearch from "../interfaces/IScientificResearch";

export const getICs = async (search:string, area:string[], institute:string, status:number, isShipToDefine:string, currentPage:number) => {

  const res = await axios.get("http://localhost:8000/scientific-research/", {
    params: {
      search,
      institute,
      status,
      isShipToDefine, 
      area: area.join(";"),
      totalPerPage: 6,
      currentPage
    }
  });
  return res;
}


export const createScientificResearch = async (research: IScientificResearch) => {
  const res = await axios.post("http://localhost:8000/scientific-research/", research);

  return res;
}

export const getAllThemes = async () => {
  const res = await axios.get("http://localhost:8000/scientific-research/themes");

  return res;
}