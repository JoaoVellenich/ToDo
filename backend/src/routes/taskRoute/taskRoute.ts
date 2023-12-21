import { Router } from "express";
import { authRoute } from "../../middlewares/Auth";
import { CreateTask } from "../../UseCase/Tasks/Create/CreateTask.";
import { CompleteTask } from "../../UseCase/Tasks/Complete/CompleteTask";

const TaskRouter = Router();

TaskRouter.post("/create", authRoute, (req, res) => {
  new CreateTask().handle(req, res);
});

TaskRouter.get("/complete/:id", authRoute, (req, res) => {
  new CompleteTask().handle(req, res);
});

export default TaskRouter;
