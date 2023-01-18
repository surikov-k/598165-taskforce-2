import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskDefault } from '../../app.constants';
import { TaskStatus } from '@task-force/shared-types';
import { TaskErrorMessages } from '../work-taks.constants';

export class MyTasksQuery {
  @Transform(({ value }) =>
    Math.min(+value || TaskDefault.COUNT_LIMIT, TaskDefault.COUNT_LIMIT)
  )
  @IsNumber()
  @IsOptional()
  public limit = TaskDefault.COUNT_LIMIT;

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
