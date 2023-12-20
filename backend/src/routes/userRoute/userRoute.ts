import { Router } from "express";
import { CreateUser } from "../../UseCase/Users/Create/CreateUser";
import { LoginUser } from "../../UseCase/Users/Login/LoginUser";

const UserRouter = Router();

UserRouter.post("/create", (req, res) => {
  new CreateUser().handle(req, res);
});

UserRouter.post("/login", (req, res) => {
  new LoginUser().handle(req, res);
});

export default UserRouter;
