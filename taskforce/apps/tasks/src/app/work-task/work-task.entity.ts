import {
  Reply,
  Skill,
  Tag,
  Task,
  TaskFile,
  TaskStatus,
} from '@task-force/shared-types';
import { Entity } from '@task-force/core';

export class WorkTaskEntity implements Entity<WorkTaskEntity>, Task {
  id: number;
  address: string;
  budget: number;
  clientId: string;
  contractorId: string;
  created: Date;
  description: string;
  dueDate: Date;
  image: string;
  skills: Skill[];
  status: TaskStatus;
  tags: Tag[];
  title: string;
  replies: Reply[];
  files: TaskFile[];
  city: string;

  constructor(workTask: Task) {
    this.fillEntity(workTask);
  }

  public toObject(): WorkTaskEntity {
    return {
      ...this,
      skills: this.skills.map(({ id }) => ({ id })),
      tags: this.tags.map(({ id }) => ({ id })),
      replies: this.replies.map(({ id }) => ({ id })),
      files: this.files.map(({ id }) => ({ id })),
    };
  }

  public fillEntity(workTask: Task) {
    this.address = workTask.address;
    this.budget = workTask.budget;
    this.clientId = workTask.clientId;
    this.contractorId = workTask.contractorId;
    this.description = workTask.description;
    this.dueDate = new Date(workTask.dueDate);
    this.id = workTask.id;
    this.image = workTask.image;
    this.skills = [...workTask.skills];
    this.status = workTask.status;
    this.tags = [...workTask.tags];
    this.title = workTask.title;
    this.replies = [...workTask.replies];
    this.files = [...workTask.files];
    this.city = workTask.city;
  }

  changeStatus(status: TaskStatus) {
    this.status = status;
  }

  getNextStatus(userId: string) {
    const nextStatus = {
      [TaskStatus.New]: {
        [this.clientId]: TaskStatus.Ongoing,
        [this.contractorId]: null,
      },
      [TaskStatus.Ongoing]: {
        [this.clientId]: TaskStatus.Done,
        [this.contractorId]: TaskStatus.Failed,
      },
      [TaskStatus.Canceled]: {
        [this.clientId]: null,
        [this.contractorId]: null,
      },
      [TaskStatus.Done]: {
        [this.clientId]: null,
        [this.contractorId]: null,
      },
      [TaskStatus.Failed]: {
        [this.clientId]: null,
        [this.contractorId]: null,
      },
    };

    return nextStatus[this.status][userId];
  }
}
