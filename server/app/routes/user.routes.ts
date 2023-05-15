import express, { Request, Response } from "express";
import { login, create } from "../controllers/user.controller";
import { resolver } from "../adapters/route.adapters";

const userRoutes = express.Router();

userRoutes.post("/login", resolver(login));
userRoutes.post("/create", resolver(create));

export default userRoutes;


