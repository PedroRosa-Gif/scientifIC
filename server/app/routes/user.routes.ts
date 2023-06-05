import express, { Request, Response } from "express";
import { login, create, edit } from "../controllers/user.controller";
import { resolver } from "../adapters/route.adapters";
import { authentication } from "../middleware/authentication";

const userRoutes = express.Router();

userRoutes.post("/login", resolver(login));
userRoutes.post("/create", resolver(create));
userRoutes.put("/edit", authentication, resolver(edit));

export default userRoutes;


