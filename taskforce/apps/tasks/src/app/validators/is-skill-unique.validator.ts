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
export class IsSkillUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly taskSkillRepository: TaskSkillRepository) {}

  async validate(name: string): Promise<boolean> {
    const skill = await this.taskSkillRepository.findByName(name);
    return !skill;
  }
}

export function IsSkillUnique(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSkillUniqueConstraint,
    });
  };
}
