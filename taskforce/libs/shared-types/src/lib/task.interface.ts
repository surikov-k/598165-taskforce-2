import { TaskStatus } from '@task-force/shared-types';

export interface Task {
  id?: string;
  clientId: string;
  contractorId: string;
  title: string;
  description: string;
  skills: string[];
  dueDate: Date;
  budget?: number
  image?: string,
  address?: string,
  tags?: string[],
  created: Date,
  status: TaskStatus;
}
