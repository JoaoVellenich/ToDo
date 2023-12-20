import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { IUserRepository } from "../../../repositories/IUserRepository";
import { UserMySql } from "../../../repositories/implementations/User/UserMySql";
import { logger } from "../../../services/logging/winston";
import { LoginUserSchema } from "../../../services/joi/UserJoi";
import { jwtSecret } from "../../../environment/config";

export class LoginUser {
  private UserRepository: IUserRepository;
  constructor() {
    this.UserRepository = new UserMySql();
  }
  async handle(request: Request, response: Response): Promise<void> {
    try {
      const { email, password } = request.body;
      const { value, error } = LoginUserSchema.validate({ email, password });
      if (error) {
        logger.error(error.details);
        response.status(400).send(error);
        return;
      }
      const userOnDB = await this.UserRepository.findUserByEmail(email);
      if (userOnDB) {
        const password = userOnDB.password;
        const match = await bcrypt.compare(value.password, password);
        if (match) {
          const token = jwt.sign(
            { email: value.email, id: userOnDB.id },
            jwtSecret,
            {
              expiresIn: "2h",
            }
          );
          logger.info("Login success");
          response.status(200).send({ token: token });
          return;
        } else {
          logger.error("Fail to make login");
          response.status(400).send(`Wrong user`);
          return;
        }
      }
      logger.error(`Failed to find user with this email ${value.email}`);
      response.status(400).send({ message: "Wrong credentials" });
      return;
    } catch (err) {
      logger.error("Failed to login user");
      logger.error(err);
      response.status(500).send({
        error: err,
      });
      return;
    }
  }
}
