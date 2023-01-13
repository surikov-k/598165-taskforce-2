import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { TaskSkillRepository } from '../task-skill/task-skill.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class DoesSkillExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly taskSkillRepository: TaskSkillRepository) {}

  async validate(skillId: number): Promise<boolean> {
    const skill = await this.taskSkillRepository.findById(skillId);
    return !!skill;
  }
}

export function DoesSkillExist(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DoesSkillExistConstraint,
    });
  };
}
