import { Reply } from '@task-force/shared-types';

export class TaskReplyEntity implements Reply {
  budget: number;
  comment: string;
  id: number;
  taskId: number;
  userId: string;

  constructor(taskReply: Reply) {
    this.fillEntity(taskReply);
  }

  public toObject(): TaskReplyEntity {
    return {...this}
  }

  public fillEntity(taskReply: Reply) {
    this.budget = taskReply.budget;
    this.comment = taskReply.comment;
    this.id = taskReply.id;
    this.taskId = taskReply.taskId;
    this.userId = taskReply.userId;
  }
}
