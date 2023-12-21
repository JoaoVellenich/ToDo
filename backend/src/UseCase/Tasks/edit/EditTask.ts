import { Request, Response } from "express";
import { ITaskRepository } from "../../../repositories/ITaskREpository";
import { TaskMySql } from "../../../repositories/implementations/Task/TaskMySql";
import { logger } from "../../../services/logging/winston";
import { EditTaskSchema } from "../../../services/joi/TaskJoi";
import { TaskValidations } from "../../../utils/validations/TaskValidations";

export class EditTask {
  private TaskRepository: ITaskRepository;
  constructor() {
    this.TaskRepository = new TaskMySql();
  }
  async handle(request: Request, response: Response) {
    try {
      const { name } = request.body;
      const taskId = request.params.id;
      const { value, error } = EditTaskSchema.validate({ name, id: taskId });
      if (error) {
        logger.error(error.details);
        response.status(400).send(error);
        return;
      }
      const task = await this.TaskRepository.findTaskById(value.id);
      if (!task) {
        logger.error(`No task found for this id: ${value.id}`);
        response.status(404).send({
          message: `No task found for this id: ${value.id}`,
        });
        return;
      }
      const user = response.locals.user;
      const validations = new TaskValidations(task, user);
      if (validations.isUserOwnerOfTask()) {
        console.log(task);
        if (validations.isTaskNotDeleted()) {
          const completedTask = await this.TaskRepository.editTask(
            task.id,
            name
          );
          logger.info(`Edit task ${JSON.stringify(task)}`);
          response.status(200).send(completedTask);
          return;
        } else {
          logger.info(`Task not found`);
          response.status(404).send("Task not found");
          return;
        }
      } else {
        logger.error(
          `User is not authorized to edit this task ${JSON.stringify(task)}`
        );
        response.status(401).send(`User is not authorized to edit this task`);
        return;
      }
    } catch (err) {
      logger.error("Failed to edit task");
      logger.error(err);
      response.status(500).send({
        error: err,
      });
    }
  }
}
