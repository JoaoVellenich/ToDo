import { Request, Response } from "express";
import { ITaskRepository } from "../../../repositories/ITaskREpository";
import { TaskMySql } from "../../../repositories/implementations/Task/TaskMySql";
import { logger } from "../../../services/logging/winston";

export class GetAllTasks {
  private TaskRepository: ITaskRepository;
  constructor() {
    this.TaskRepository = new TaskMySql();
  }

  async handle(request: Request, response: Response) {
    try {
      const user = response.locals.user;
      const tasksFound = await this.TaskRepository.getTasksFromUser(user.id);
      response.status(200).send(tasksFound);
    } catch (err) {
      logger.error("Failed to create task");
      logger.error(err);
      response.status(500).send({
        error: err,
      });
    }
  }
}
