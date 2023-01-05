import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_TASK_COUNT_LIMIT } from '../../app.constants';
import { TaskSorting } from '../work-taks.constants';

export class TaskQuery {
  @Transform(({ value }) =>
    Math.min(+value || DEFAULT_TASK_COUNT_LIMIT, DEFAULT_TASK_COUNT_LIMIT)
  )
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

  @Transform(({ value }) => value.split(',').map((skillId) => +skillId))
  @IsArray()
  @IsOptional()
  public skills?: number[];

  @Transform(({ value }) => value.split(',').map((tagId) => +tagId))
  @IsArray()
  @IsOptional()
  public tags?: number[];

  @IsEnum(TaskSorting)
  @IsOptional()
  public sort: TaskSorting;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
