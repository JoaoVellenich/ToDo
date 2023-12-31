import express from "express";
import db from "./config/db";
import cors from "cors";
import UserRouter from "./routes/userRoute/userRoute";
import { logger } from "./services/logging/winston";
import TaskRouter from "./routes/taskRoute/taskRoute";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/task", TaskRouter);

app.listen("8080", async () => {
  await db.sync();
  logger.info("App is running on http://localhost:8080");
});
