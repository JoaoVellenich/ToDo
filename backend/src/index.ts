import express from "express";
import db from "./config/db";
import UserRouter from "./routes/userRoute/userRoute";
import { logger } from "./services/logging/winston";

const app = express();

app.use(express.json());

app.use("/api/v1/user", UserRouter);

app.listen("8080", async () => {
  await db.sync();
  logger.info("App is running on http://localhost:8080");
});
