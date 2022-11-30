import { Task, User } from '@task-force/shared-types';

export interface Reply {
  id?: string;
  userId: string;
  taskId: string;
  comment: string;
  budget: number;
}
