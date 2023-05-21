import express from "express";
import { resolver } from "../adapters/route.adapters";
import { create } from "../controllers/user.controller";

const scientificResearchRoutes = express.Router();

scientificResearchRoutes.post("/create", resolver(create));

export default scientificResearchRoutes;