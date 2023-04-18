import express, { Request, Response } from "express";
import { userController } from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.get("/verify-user", async (req: Request, res: Response) => {
    try {
        const user = await userController.verifyUser(req.body.email, req.body.password)

        res.send(200).json(user);
    } catch (error) {
        console.log(error);
    }
});

export default userRoutes;


