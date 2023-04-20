import express, { Request, Response } from "express";
import { userController } from "../controllers/user.controller";
import IUser from "../interfaces/IUser";

const userRoutes = express.Router();

userRoutes.post("/create", async (req: Request, res: Response) => {
    try {
        const infos = req.body as IUser;
        console.log(infos);
        
        userController.create(infos)
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
    }
});

export default userRoutes;
