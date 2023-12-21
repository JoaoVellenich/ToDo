import { Request, Response } from "express";
import { logger } from "../../../services/logging/winston";
import { CreateTaskSchema } from "../../../services/joi/TaskJOi";
import { ITaskRepository } from "../../../repositories/ITaskREpository";
import { TaskMySql } from "../../../repositories/implementations/Task/TaskMySql";
import { Task } from "../../../entities/Task";

export class CreateTask {
  private TaskRepository: ITaskRepository;
  constructor() {
    this.TaskRepository = new TaskMySql();
  }
  async handle(request: Request, response: Response) {
    try {
      const { name } = request.body;
      const { value, error } = CreateTaskSchema.validate({ name });
      if (error) {
        logger.error(error.details);
        response.status(400).send(error);
        return;
      }
      const user = response.locals.user;
      const ownerId = user.id;

      const taskCreated: Task = await this.TaskRepository.createTask(
        value.name,
        ownerId
      );
      logger.info(`Created new Task ${JSON.stringify(taskCreated)}`);
      response.status(200).send(taskCreated);
      return;
    } catch (err) {
      logger.error("Failed to create user");
      logger.error(err);
      response.status(500).send({
        error: err,
      });
    }
  }
}
