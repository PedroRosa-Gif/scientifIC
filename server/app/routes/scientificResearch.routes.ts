import express from "express";
import { resolver } from "../adapters/route.adapters";
import { getThemes, create } from "../controllers/scientificResearch.controller";

const scientificResearchRoutes = express.Router();


scientificResearchRoutes.post("/", resolver(create));
scientificResearchRoutes.get("/themes", resolver(getThemes));

export default scientificResearchRoutes;