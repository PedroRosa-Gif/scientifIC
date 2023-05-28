import express from "express";
import { resolver } from "../adapters/route.adapters";
import { getApplications } from "../controllers/scientificResearchApplication.controller";

const scientificResearchApplicationRoutes = express.Router();

scientificResearchApplicationRoutes.post("/getApplications", resolver(getApplications));

export default scientificResearchApplicationRoutes;