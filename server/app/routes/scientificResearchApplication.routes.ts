import express from "express";
import { resolver } from "../adapters/route.adapters";
import { applyToScientificResearch, getApplications, cancelCandidacy, getApplicationsByResearchQuery } from "../controllers/scientificResearchApplication.controller";

const scientificResearchApplicationRoutes = express.Router();

scientificResearchApplicationRoutes.get("/byResearch", resolver(getApplicationsByResearchQuery));
scientificResearchApplicationRoutes.post("/", resolver(applyToScientificResearch));
scientificResearchApplicationRoutes.post("/getApplications", resolver(getApplications));
scientificResearchApplicationRoutes.post("/cancelCandidacy", resolver(cancelCandidacy));

export default scientificResearchApplicationRoutes;