import { Entity } from '@task-force/core';
import { Tag } from '@task-force/shared-types';

export class TaskTagEntity implements Entity<TaskTagEntity>, Tag {
  id: number;
  name: string;

  constructor(tag: Tag) {
    this.fillEntity(tag)
  }

  fillEntity(entity) {
    this.id = entity.id;
    this.name = entity.name;
  }

  toObject(): TaskTagEntity {
    return {...this};
  }
}
