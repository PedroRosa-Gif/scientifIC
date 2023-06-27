import IScientificResearchEvent from "../interfaces/IScientificResearchEvent";
import axiosInstance from "./axiosInstance";

export const getEventsFromReseach = async (idResearch:string) => {
	const res = await axiosInstance.get(`/scientific-research-event/${idResearch}`);

	return res;
}
  
export const createEvent = async (idUser: string, event: IScientificResearchEvent) => {
	const res = await axiosInstance.post(`/scientific-research-event/create`, event);

	return res;
}