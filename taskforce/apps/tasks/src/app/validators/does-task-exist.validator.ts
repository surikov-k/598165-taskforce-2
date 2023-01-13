import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { WorkTaskRepository } from '../work-task/work-task.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class DoesTaskExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly workTaskRepository: WorkTaskRepository) {}

  async validate(taskId: number): Promise<boolean> {
    const task = await this.workTaskRepository.findById(taskId);
    return !!task;
  }
}

export function DoesTaskExist(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DoesTaskExistConstraint,
    });
  };
}
