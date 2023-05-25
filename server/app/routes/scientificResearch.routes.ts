import express from "express";
import { resolver } from "../adapters/route.adapters";
import { index, create } from "../controllers/scientificResearch.controller";

const scientificResearchRoutes = express.Router();

scientificResearchRoutes.get("/", resolver(index));
scientificResearchRoutes.post("/", resolver(create));

export default scientificResearchRoutes;