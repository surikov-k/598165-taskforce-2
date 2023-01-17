import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '@task-force/shared-types';
import { TaskErrorMessages } from '../../work-task/work-taks.constants';

export class CheckTaskStatus implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe must be used only with params!');
    }

    if (!Object.keys(TaskStatus).includes(value)) {
      throw new BadRequestException(TaskErrorMessages.WRONG_STATUS);
    }
    return value;
  }
}
