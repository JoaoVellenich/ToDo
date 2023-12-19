import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { UserMySql } from "../../../repositories/implementations/User/UserMySql";
import { CreateUserSchema } from "../../../services/joi/UserJoi";
import { logger } from "../../../services/logging/winston";
import { User } from "../../../entities/User";

export class CreateUser {
  private UserRepository: IUserRepository;
  constructor() {
    this.UserRepository = new UserMySql();
  }
  async handle(request: Request, response: Response): Promise<void> {
    try {
      const { email, name, password } = request.body;
      const { value, error } = CreateUserSchema.validate({
        email,
        name,
        password,
      });
      if (error) {
        logger.error(error.details);
        response.status(400).send(error);
        return;
      }
      const hasUserOnDB = await this.UserRepository.findUserByEmail(
        value.email
      );
      if (hasUserOnDB) {
        logger.info(`User with this email: ${email} already exists`);
        response.status(409).send({
          error: `User with this email: ${email} already exists`,
        });
        return;
      }
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(value.password, salt);

      const date = new Date();
      const userToCreate = new User({
        email: value.email,
        name: value.name,
        password: passwordHash,
        createdAt: date.getTime(),
        updatedAt: date.getTime(),
      });
      const userCreated = await this.UserRepository.createUser(userToCreate);
      response.status(200).send(userCreated);
    } catch (err) {
      logger.error("Failed to create user");
      logger.error(err);
      response.status(500).send({
        error: err,
      });
    }
  }
}
