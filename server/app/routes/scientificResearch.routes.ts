import express, { Request, Response } from "express";
import { resolver } from "../adapters/route.adapters";
import { getICs } from "../controllers/scientificResearch.controller";

const scientificResearch = express.Router();

scientificResearch.get("/", resolver(getICs));

export default scientificResearch;


