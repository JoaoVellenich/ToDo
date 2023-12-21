import { Task } from "../../../entities/Task";
import TaskModel from "../../../models/TaskModel";
import { ITaskRepository } from "../../ITaskREpository";

export class TaskMySql implements ITaskRepository {
  async createTask(name: string, ownerId: number): Promise<Task> {
    const date = new Date();
    const newTask = await TaskModel.create({
      name: name,
      createdAt: date.getTime(),
      completedAt: null,
      updatedAt: date.getTime(),
      excludeAt: null,
      ownerId: ownerId,
    });
    return new Task(newTask.dataValues);
  }
  async findTaskById(id: number): Promise<Task | undefined> {
    const findTask = await TaskModel.findByPk(id);
    if (findTask?.dataValues) {
      const task: Task = new Task(findTask.dataValues);
      return task;
    }
    return undefined;
  }
  async getTasksFromUser(userId: number): Promise<Task[] | undefined> {
    const tasksFound = await TaskModel.findAll({
      where: {
        ownerId: userId,
      },
    });
    if (tasksFound.length > 0) {
      const userTasks: Task[] = [];
      tasksFound.map((task) => {
        userTasks.push(new Task(task.dataValues));
      });
      return userTasks;
    }
    return undefined;
  }
  async completeTask(id: number): Promise<Task> {
    const task = await TaskModel.findByPk(id);
    if (task) {
      const date = new Date();
      task.update({
        completedAt: date.getTime(),
      });
      return new Task(task.dataValues);
    } else {
      throw new Error(`Error to find task with id: ${id}`);
    }
  }
  async excludeTask(id: number): Promise<Task> {
    const task = await TaskModel.findByPk(id);
    if (task) {
      const date = new Date();
      task.update({
        excludeAt: date.getTime(),
      });
      return new Task(task.dataValues);
    } else {
      throw new Error(`Error to find task with id: ${id}`);
    }
  }
}
