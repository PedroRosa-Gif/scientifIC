import express from "express";
import { resolver } from "../adapters/route.adapters";
import { authentication } from "../middleware/authentication";
import { getThemes, create, getICs, getResearchApplications, assignStudent, getMyICs, getOnGoingResearch, edit } from "../controllers/scientificResearch.controller";

const scientificResearchRoutes = express.Router();

scientificResearchRoutes.post("/", authentication, resolver(create));
scientificResearchRoutes.put("/:idResearch", authentication, resolver(edit));
scientificResearchRoutes.get("/themes", authentication, resolver(getThemes));
scientificResearchRoutes.get("/", resolver(getICs));
scientificResearchRoutes.get("/applications", authentication, resolver(getResearchApplications));
scientificResearchRoutes.get("/assign/:idResearch", authentication, resolver(assignStudent));
scientificResearchRoutes.get("/getMyICs", authentication, resolver(getMyICs));
scientificResearchRoutes.get("/getResearch", authentication, resolver(getOnGoingResearch));

export default scientificResearchRoutes;
