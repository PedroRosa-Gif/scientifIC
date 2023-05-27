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