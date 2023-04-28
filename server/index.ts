import express, { Express, Request, Response } from "express";
import connectDb from "./app/config/database";

connectDb();

const port = 8000;

const app: Express = express();

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});