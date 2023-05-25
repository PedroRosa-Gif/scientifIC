import axios, { AxiosResponse } from "axios";
import IScientificResearch from "../interfaces/IScientificResearch";

export const createScientificResearch = async (research: IScientificResearch) => {
    const res = await axios.post("http://localhost:8000/scientific-research/", research);
  
    return res;
  }