import { Router } from "express";
import { authRoute } from "../../middlewares/Auth";
import { CreateTask } from "../../UseCase/Tasks/Create/CreateTask.";

const TaskRouter = Router();

TaskRouter.post("/create", authRoute, (req, res) => {
  new CreateTask().handle(req, res);
});

export default TaskRouter;
