import express from "express";

const app = express();

app.listen("8080", () => {
  console.log("App is running on http://localhost:8080/");
});