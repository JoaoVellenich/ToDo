import { Router } from "express";
import { authRoute } from "../../middlewares/Auth";
import { CreateTask } from "../../UseCase/Tasks/Create/CreateTask.";
import { CompleteTask } from "../../UseCase/Tasks/Complete/CompleteTask";
import { GetAllTasks } from "../../UseCase/Tasks/GetAll/GetAllTasks";

const TaskRouter = Router();

TaskRouter.get("/", authRoute, (req, res) => {
  new GetAllTasks().handle(req, res);
});

TaskRouter.post("/create", authRoute, (req, res) => {
  new CreateTask().handle(req, res);
});

TaskRouter.get("/complete/:id", authRoute, (req, res) => {
  new CompleteTask().handle(req, res);
});

export default TaskRouter;
