import { Router } from "express";
import { CreateUser } from "../../UseCase/Users/Create/CreateUser";

const UserRouter = Router();

UserRouter.post("/", (req, res) => {
  new CreateUser().handle(req, res);
});

export default UserRouter;
