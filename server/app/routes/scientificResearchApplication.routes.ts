import express from "express";
import { resolver } from "../adapters/route.adapters";
import { applyToScientificResearch, getApplicationsByResearchQuery } from "../controllers/scientificResearchApplication.controller";

const scientificResearchApplicationRoutes = express.Router();

scientificResearchApplicationRoutes.get("/byResearch", resolver(getApplicationsByResearchQuery));
scientificResearchApplicationRoutes.post("/", resolver(applyToScientificResearch));

export default scientificResearchApplicationRoutes;