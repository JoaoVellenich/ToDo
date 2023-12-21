import { Request, Response } from "express";
import { ITaskRepository } from "../../../repositories/ITaskREpository";
import { TaskMySql } from "../../../repositories/implementations/Task/TaskMySql";
import { logger } from "../../../services/logging/winston";
import { TaskIdSchema } from "../../../services/joi/TaskJoi";
import { TaskValidations } from "../../../utils/validations/TaskValidations";

export class DeleteTask {
  private TaskRepository: ITaskRepository;
  constructor() {
    this.TaskRepository = new TaskMySql();
  }

  async handle(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const { value, error } = TaskIdSchema.validate(id);
      if (error) {
        logger.error(error.details);
        response.status(400).send(error);
        return;
      }
      const task = await this.TaskRepository.findTaskById(value);
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
        console.log(task);
        if (validations.isTaskNotDeleted()) {
          const completedTask = await this.TaskRepository.excludeTask(task.id);
          logger.info(`Delete task ${JSON.stringify(task)}`);
          response.status(200).send(completedTask);
          return;
        } else {
          logger.info(`Task is already deleted ${JSON.stringify(task)}`);
          response.status(200).send(task);
          return;
        }
      } else {
        logger.error(
          `User is not authorized to delete this task ${JSON.stringify(task)}`
        );
        response.status(401).send(`User is not authorized to delete this task`);
        return;
      }
    } catch (err) {
      logger.error("Failed to delete task");
      logger.error(err);
      response.status(500).send({
        error: err,
      });
    }
  }
}
