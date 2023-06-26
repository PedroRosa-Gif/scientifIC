import IScientificResearch from "../interfaces/IScientificResearch";
import axiosInstance from "./axiosInstance";

export const getICs = async (search:string, area:string[], institute:string, status:number, isShipToDefine:string, currentPage:number) => {

  const res = await axiosInstance.get("/scientific-research/", {
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

export const assignStudent = async (idResearch: string, idStudent: string, idAdvisor: string) => {
  const res = await axiosInstance.get(`/scientific-research/assign/${idResearch}`, {
    params: {
      idAdvisor: idAdvisor,
      idStudent: idStudent
    }
  });

  return res;
}

export const getApplicationsFromResearch = async (idReseach: string, idUser: string) => {
  const res = await axiosInstance.get(`/scientific-research/applications?idResearch=${idReseach}&idUser=${idUser}`);

  return res;
}

export const createScientificResearch = async (research: IScientificResearch) => {
  const res = await axiosInstance.post("/scientific-research/", research);

  return res;
}

export const getAllThemes = async () => {
  const res = await axiosInstance.get("/scientific-research/themes");

  return res;
}

export const getMyICs = async (filter:string, id:string) => {
  const res = await axiosInstance.get("http://localhost:8000/scientific-research/getMyICs", {
    params: {
      filter,
      id
    }
  });
  return res;
}