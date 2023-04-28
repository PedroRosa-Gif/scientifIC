import express from "express";
import { create } from "../controllers/user.controller";
import { resolver } from "../adapters/route.adapter";

const userRoutes = express.Router();

userRoutes.post("/create", resolver(create));

export default userRoutes;