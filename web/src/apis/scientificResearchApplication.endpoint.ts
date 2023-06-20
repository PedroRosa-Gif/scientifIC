import axiosInstance from "./axiosInstance";

export const applyToAScientificResearch = async (scientificResearchId:string, studentId:string, motivation:string) => {

  const res = await axiosInstance.post("/scientific-research-application/", {
    scientificResearchId,
    studentId,
    motivation,
    createdAt: new Date()
  });

  return res;
}

export const getApplications = async (id:string) => {

  const res = await axiosInstance.post("/scientific-research-application/getApplications", {
    id: id,
  });

  return res;
}

export const cancelCandidacy = async (id:string) => {
  const res = await axiosInstance.post("/scientific-research-application/cancelCandidacy", {
    id: id,
  });
  return res;
}

export const getApplicationsByResearchQuery = async (idResearch: string, search: string) => {
  const res = await axiosInstance.get(`/scientific-research-application/byResearch?idResearch=${idResearch}&search=${search}`);

  return res;
}