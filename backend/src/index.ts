import express from "express";
import db from "./config/db";
import UserRouter from "./routes/userRoute/userRoute";
import { logger } from "./services/logging/winston";
import { UserMySql } from "./repositories/implementations/User/UserMySql";
import { User } from "./entities/User";

const app = express();

app.use("/api/v1/user", UserRouter);

app.listen("8080", async () => {
  await db.sync();
  let user: User = new User({
    name: "Teste",
    email: "e3",
    createdAt: "1",
    updatedAt: "1",
    password: "Teste",
  });
  console.log(user);
  user = await new UserMySql().createUser(user);
  console.log(user);
  logger.info("App is running on http://localhost:8080");
});
