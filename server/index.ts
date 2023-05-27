import express, { Express } from "express";
import connectDb from "./app/config/database";
import userRoutes from "./app/routes/user.routes";
import { errorHandling } from "./app/middleware/errorHandling";
import acessControlOrigin from "./app/config/cors";
import scientificResearchRoutes from "./app/routes/scientificResearch.routes";
import scientificResearchApplicationRoutes from "./app/routes/scientificResearchApplication.routes";

connectDb();

const port = 8000;
const app: Express = express();

app.use(acessControlOrigin);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/scientific-research", scientificResearchRoutes);
app.use("/scientific-research-application", scientificResearchApplicationRoutes);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});

app.use(errorHandling);