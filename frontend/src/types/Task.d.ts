export type ITask = {
  id: number;
  name: string;
  createdAt: string;
  completedAt: string | null;
  updatedAt: string;
  excludeAt: string | null;
  ownerId: number;
};
