import express from "express";
import { resolver } from "../adapters/route.adapters";
import { create, getAllEventsFromResearch } from "../controllers/scientificResearchEvent.controller";

const scientificResearchEventRoutes = express.Router();

scientificResearchEventRoutes.post("/:idUser", resolver(create));
scientificResearchEventRoutes.post("/:idResearch", resolver(getAllEventsFromResearch));

export default scientificResearchEventRoutes;