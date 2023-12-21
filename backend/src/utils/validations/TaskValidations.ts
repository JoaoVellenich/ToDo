import { Task } from "../../entities/Task";
import { IAuthUser } from "../types/IUserType";

export class TaskValidations {
  constructor(private task: Task, private user: IAuthUser) {}

  isTaskNotCompleted() {
    return this.task.completedAt == null;
  }
  isUserOwnerOfTask() {
    return this.task.ownerId == this.user.id;
  }
}
