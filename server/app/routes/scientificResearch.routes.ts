import express from "express";
import { resolver } from "../adapters/route.adapters";
import { getThemes, create, getICs, getMyICs } from "../controllers/scientificResearch.controller";

const scientificResearchRoutes = express.Router();

scientificResearchRoutes.post("/", resolver(create));
scientificResearchRoutes.get("/themes", resolver(getThemes));
scientificResearchRoutes.get("/", resolver(getICs));
scientificResearchRoutes.get("/getMyICs", resolver(getMyICs));

export default scientificResearchRoutes;
