import express from "express";
import { resolver } from "../adapters/route.adapters";
import { create, getAllEventsFromResearch } from "../controllers/scientificResearchEvent.controller";
import { authentication } from "../middleware/authentication";

const scientificResearchEventRoutes = express.Router();

scientificResearchEventRoutes.post("/create", authentication, resolver(create));
scientificResearchEventRoutes.get("/:idResearch", authentication, resolver(getAllEventsFromResearch));

export default scientificResearchEventRoutes;