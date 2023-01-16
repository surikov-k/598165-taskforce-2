import { Entity } from '@task-force/core';
import { TaskFile } from '@task-force/shared-types';

export class TaskFileEntity implements Entity<TaskFileEntity>, TaskFile {
  id: number;
  taskId: number;
  filename: string;

  constructor(file: TaskFile) {
    this.fillEntity(file);
  }

  fillEntity(file: TaskFile) {
    this.id = file.id;
    this.taskId = file.taskId;
    this.filename = file.filename;
  }

  toObject(): TaskFileEntity {
    return { ...this };
  }
}
