import { Task } from "../entities/Task";

export interface ITaskRepository {
  createTask(name: string, ownerId: number): Promise<Task>;
  findTaskById(id: number): Promise<Task | undefined>;
  getTasksFromUser(userId: number): Promise<Task[] | undefined>;
  completeTask(id: number): Promise<Task>;
  excludeTask(id: number): Promise<Task>;
  editTask(id: number, name: string): Promise<Task>;
}
