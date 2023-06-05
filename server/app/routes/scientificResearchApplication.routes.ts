import express from "express";
import { resolver } from "../adapters/route.adapters";
import { applyToScientificResearch, getApplications, cancelCandidacy, getApplicationsByResearchQuery } from "../controllers/scientificResearchApplication.controller";
import { authentication } from "../middleware/authentication";

const scientificResearchApplicationRoutes = express.Router();

scientificResearchApplicationRoutes.get("/byResearch", authentication, resolver(getApplicationsByResearchQuery));
scientificResearchApplicationRoutes.post("/", authentication, resolver(applyToScientificResearch));
scientificResearchApplicationRoutes.post("/getApplications", authentication, resolver(getApplications));
scientificResearchApplicationRoutes.post("/cancelCandidacy", authentication, resolver(cancelCandidacy));

export default scientificResearchApplicationRoutes;