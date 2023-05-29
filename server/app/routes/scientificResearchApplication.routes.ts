import express from "express";
import { resolver } from "../adapters/route.adapters";
import { applyToScientificResearch, getApplications, cancelCandidacy } from "../controllers/scientificResearchApplication.controller";

const scientificResearchApplicationRoutes = express.Router();

scientificResearchApplicationRoutes.post("/", resolver(applyToScientificResearch));
scientificResearchApplicationRoutes.post("/getApplications", resolver(getApplications));
scientificResearchApplicationRoutes.post("/cancelCandidacy", resolver(cancelCandidacy));

export default scientificResearchApplicationRoutes;