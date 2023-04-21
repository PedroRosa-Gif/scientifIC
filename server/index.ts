import express, { Express } from "express";
import connectDb from "./app/config/database";
import userRoutes from "./app/routes/user.route";
import { errorHandling } from "./app/middleware/errorHandling";

connectDb();

const port = 8000;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});

app.use(errorHandling);