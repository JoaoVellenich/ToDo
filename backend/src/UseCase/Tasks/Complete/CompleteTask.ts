import { Request, Response } from "express";
import { ITaskRepository } from "../../../repositories/ITaskREpository";
import { TaskMySql } from "../../../repositories/implementations/Task/TaskMySql";
import { logger } from "../../../services/logging/winston";
import { TaskValidations } from "../../../utils/validations/TaskValidations";

export class CompleteTask {
  private TaskRepository: ITaskRepository;
  constructor() {
    this.TaskRepository = new TaskMySql();
  }
  async handle(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const task = await this.TaskRepository.findTaskById(Number(id));
      if (!task) {
        logger.error(`No task found for this id: ${id}`);
        response.status(404).send({
          message: `No task found for this id: ${id}`,
        });
        return;
      }
      const user = response.locals.user;
      const validations = new TaskValidations(task, user);
      if (validations.isUserOwnerOfTask()) {
        if (validations.isTaskNotCompleted()) {
          const completedTask = await this.TaskRepository.completeTask(task.id);
          logger.info(`Complete task ${JSON.stringify(task)}`);
          response.status(200).send(completedTask);
          return;
        } else {
          logger.info(`Task is already completed ${JSON.stringify(task)}`);
          response.status(200).send(task);
          return;
        }
      } else {
        logger.error(
          `User is not authorized to complete this task ${JSON.stringify(task)}`
        );
        response
          .status(401)
          .send(`User is not authorized to complete this task`);
        return;
      }
    } catch (err) {
      logger.error("Failed to complete task");
      logger.error(err);
      response.status(500).send({
        error: err,
      });
    }
  }
}
