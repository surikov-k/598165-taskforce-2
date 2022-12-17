import { Reply, Skill, Tag, TaskStatus } from '@task-force/shared-types';

export interface Task {
  id?: number;
  clientId: string;
  contractorId?: string;
  title: string;
  description: string;
  skills?: Skill[];
  dueDate?: Date;
  budget?: number;
  image?: string;
  address?: string;
  tags?: Tag[];
  created?: Date;
  status?: TaskStatus;
  replies?: Reply[];
}
