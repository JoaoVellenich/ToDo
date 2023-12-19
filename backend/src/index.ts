import express from "express";
import db from "./config/db";
import UserRouter from "./routes/userRoute/userRoute";

const app = express();

app.use("/api/v1/user", UserRouter);

app.listen("8080", async () => {
  await db.sync();
  console.log(`App is runing on http://localhost:8080`);
});
