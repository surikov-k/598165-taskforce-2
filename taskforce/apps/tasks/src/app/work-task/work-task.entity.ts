import { Task, TaskStatus } from '@task-force/shared-types';

export class WorkTaskEntity implements Task {
  id: string;
  address: string;
  budget: number;
  clientId: string;
  contractorId: string;
  created: Date;
  description: string;
  dueDate: Date;
  image: string;
  skills: string[];
  status: TaskStatus;
  tags: string[];
  title: string;

  constructor(workTask: Task) {
    this.fillEntity(workTask)
  }

  public toObject() {
    return {...this}
  }

  public fillEntity(workTask: Task) {
    this.address = workTask.address;
    this.budget = workTask.budget;
    this.clientId = workTask.clientId;
    this.contractorId = workTask.contractorId;
    this.created = workTask.created;
    this.description = workTask.description;
    this.dueDate = workTask.dueDate;
    this.id = workTask.id;
    this.image = workTask.image;
    this.skills = workTask.skills;
    this.status = workTask.status;
    this.tags = workTask.tags;
    this.title = workTask.title;
  }

  changeStatus(status: TaskStatus) {
    // TODO: Change the task's status strategy
    this.status = status;
    return this;
  }
}
