import { Request, Response } from "express";
import { scientificResearchApplicationService } from "../services/scientificResearchApplication.service";

export const getApplications = async (req:Request, res:Response) => {
  const { id } = req.body;
  const applications = await scientificResearchApplicationService.getApplications(id);
  
  res.status(200).send({
    applications: applications
  });
}