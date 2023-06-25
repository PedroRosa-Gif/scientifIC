import axios from "axios";

export const applyToAScientificResearch = async (scientificResearchId:string, studentId:string, motivation:string) => {

  const res = await axios.post("http://localhost:8000/scientific-research-application/", {
    scientificResearchId,
    studentId,
    motivation,
    createdAt: new Date(),
  });

  return res;
}

export const getApplications = async (id:string, filter: string) => {

  const res = await axios.post("http://localhost:8000/scientific-research-application/getApplications", {
    id: id,
    filter: filter,
  });

  return res;
}

export const cancelCandidacy = async (id:string) => {
  const res = await axios.post("http://localhost:8000/scientific-research-application/cancelCandidacy", {
    id: id,
  });

  return res;
}