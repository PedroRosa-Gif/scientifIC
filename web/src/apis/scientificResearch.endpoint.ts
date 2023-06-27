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

export const getResearch = async (idResearch: string, idUser: string) => {
  const res = await axiosInstance.get(`/scientific-research/getResearch?idResearch=${idResearch}`);

  return res;
}

export const toggleCanceled = async (idResearch: string) => {
  const res = await axiosInstance.get(`/scientific-research/canceled/${idResearch}`);

  return res;
}

export const getOnlyResearch = async (idResearch: string, idUser: string) => {
  const res = await axiosInstance.get(`/scientific-research/getOnlyResearch?idResearch=${idResearch}`);

  return res;
}

export const assignStudent = async (idResearch: string, idStudent: string, idAdvisor: string) => {
  const res = await axiosInstance.get(`/scientific-research/assign/${idResearch}`, {
    params: {
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

export const editScientificResearch = async (idReseach: string, research: IScientificResearch, idUser: string) => {
  const res = await axiosInstance.put(`/scientific-research/${idReseach}`, research);

  return res;
}

export const deleteScientificResearch = async (idResearch: string) => {
  const res = await axiosInstance.delete(`/scientific-research/${idResearch}`);

  return res;
}

export const getAllThemes = async () => {
  const res = await axiosInstance.get("/scientific-research/themes");

  return res;
}

export const getMyICs = async (filter:string, id:string, type: number) => {
  const res = await axiosInstance.get("/scientific-research/getMyICs", {
    params: {
      filter,
      id: id,
      type: type === 1 ? "student" : "advisor",
    }
  });
  return res;
}