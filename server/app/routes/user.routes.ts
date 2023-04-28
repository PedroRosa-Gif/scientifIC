import express, { Request, Response } from "express";
import { login } from "../controllers/user.controller";
import { resolver } from "../adapters/route.adapters";

const userRoutes = express.Router();

userRoutes.post("/login", resolver(login));

export default userRoutes;


