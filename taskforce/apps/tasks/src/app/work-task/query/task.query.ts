import {
  IsArray,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskDefault } from '../../app.constants';
import { TaskSorting } from '../work-taks.constants';

export class TaskQuery {
  @Transform(({ value }) =>
    Math.min(+value || TaskDefault.COUNT_LIMIT, TaskDefault.COUNT_LIMIT)
  )
  @IsNumber()
  @IsOptional()
  public limit = TaskDefault.COUNT_LIMIT;

  @Transform(({ value }) => value.split(',').map((skillId) => +skillId))
  @IsArray()
  @IsOptional()
  public skills?: number[];

  @Transform(({ value }) => value.split(',').map((tagId) => +tagId))
  @IsArray()
  @IsOptional()
  public tags?: number[];

  @IsString()
  @IsOptional()
  @IsIn(['Москва', 'Санкт-Петербург', 'Владивосток'])
  city: string;

  @IsEnum(TaskSorting)
  @IsOptional()
  public sort: TaskSorting;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
