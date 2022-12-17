import { Entity } from '@task-force/core';
import { Skill } from '@task-force/shared-types';

export class TaskSkillEntity implements Entity<TaskSkillEntity>, Skill {
  public id: number;
  public name: string;

  constructor(skill: Skill) {
    this.fillEntity(skill);
  }

  fillEntity(entity: Skill) {
    this.name = entity.name;
    this.id = entity.id
  }

  toObject(): TaskSkillEntity {
    return {...this};
  }

}
