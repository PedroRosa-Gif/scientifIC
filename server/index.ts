import express, { Express, Request, Response } from "express";
import connectDb from "./app/config/database";
import userRoutes from "./app/routes/user.routes";

connectDb();

const port = 8000;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO FROM EXPRESS + TS!!!!");
});


app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});