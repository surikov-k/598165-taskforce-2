import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_TASK_COUNT_LIMIT } from '../../app.constants';
import { TaskStatus } from '@task-force/shared-types';
import { TaskErrorMessages } from '../work-taks.constants';

export class MyTasksQuery {
  @Transform(({ value }) =>
    Math.min(+value || DEFAULT_TASK_COUNT_LIMIT, DEFAULT_TASK_COUNT_LIMIT)
  )
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

  @IsString()
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: TaskErrorMessages.WRONG_STATUS,
  })
  status: TaskStatus;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
