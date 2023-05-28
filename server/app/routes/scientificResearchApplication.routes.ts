import express from "express";
import { resolver } from "../adapters/route.adapters";
import { applyToScientificResearch } from "../controllers/scientificResearchApplication.controller";

const scientificResearchApplicationRoutes = express.Router();

scientificResearchApplicationRoutes.post("/", resolver(applyToScientificResearch));

export default scientificResearchApplicationRoutes;