import express from "express";
import { resolver } from "../adapters/route.adapters";
import { getThemes, create, getICs, getResearchApplications, assignStudent } from "../controllers/scientificResearch.controller";
import { authentication } from "../middleware/authentication";

const scientificResearchRoutes = express.Router();

scientificResearchRoutes.post("/", authentication, resolver(create));
scientificResearchRoutes.get("/themes", authentication, resolver(getThemes));
scientificResearchRoutes.get("/", resolver(getICs));
scientificResearchRoutes.get("/applications", authentication, resolver(getResearchApplications));
scientificResearchRoutes.get("/assign/:idResearch", authentication, resolver(assignStudent));

export default scientificResearchRoutes;
