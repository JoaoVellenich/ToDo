import { ITask } from "../utils/types/TaskType";

export class Task {
  public id!: number;
  public name!: string;

  public createdAt!: number;
  public completedAt!: number;
  public updatedAt!: number;
  public excludeAt!: number;

  public ownerId!: number;
  constructor(props: ITask, id?: number) {
    Object.assign(this, props);
    if (id) {
      this.id = id;
    }
  }
}
