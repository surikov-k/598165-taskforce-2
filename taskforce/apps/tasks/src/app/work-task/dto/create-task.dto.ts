import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinDate,
  MinLength,
} from 'class-validator';
import {
  MAX_ADDRESS_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MAX_TAGS_NUMBER,
  MAX_TITLE_LENGTH,
  MIN_ADDRESS_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
  TaskErrorMessages,
} from '../work-taks.constants';
import { Transform } from 'class-transformer';
import { DoesSkillExist, IsTagValid } from '../../validators';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Address of the place where is the task should be done',
    example: 'Центральный район',
  })
  @IsOptional()
  @IsString()
  @MinLength(MIN_ADDRESS_LENGTH, {
    message: TaskErrorMessages.ADDRESS_TOO_SHORT,
  })
  @MaxLength(MAX_ADDRESS_LENGTH, {
    message: TaskErrorMessages.ADDRESS_TOO_LONG,
  })
  address: string;

  @ApiProperty({
    description: 'City in which the task should be done',
    example: 'Москва',
  })
  @IsString()
  @IsIn(['Москва', 'Санкт-Петербург', 'Владивосток'])
  city: string;

  @ApiProperty({
    description: 'A budget of the task',
    example: '100',
  })
  @IsNumber()
  @Min(0, {
    message: TaskErrorMessages.BUDGET_INCORRECT,
  })
  budget: number;

  @ApiProperty({
    description: 'Task full description',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
  })
  @MinLength(MIN_DESCRIPTION_LENGTH, {
    message: TaskErrorMessages.DESCRIPTION_TOO_SHORT,
  })
  @MaxLength(MAX_DESCRIPTION_LENGTH, {
    message: TaskErrorMessages.DESCRIPTION_TOO_LONG,
  })
  description: string;

  @ApiProperty({
    description: 'Task due date',
    example: '2022-11-30T09:17:04.013Z',
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date(), {
    message: TaskErrorMessages.DUE_DATE_INCORRECT,
  })
  dueDate: string;

  @ApiProperty({
    description: 'Task skills',
    example: [1],
  })
  @Transform(({ value }) => value.map((skillId) => +skillId))
  @IsArray()
  @IsNumber({}, { each: true })
  @DoesSkillExist({ each: true, message: TaskErrorMessages.SKILL_EXISTS })
  skills: number[];

  @ApiProperty({
    description: 'Task tags',
    example: [1],
  })
  @IsOptional()
  @Transform(({ value }) => [
    ...new Set(value.map((tag: string) => tag.toLowerCase())),
  ])
  @IsArray()
  @ArrayMaxSize(MAX_TAGS_NUMBER)
  @IsTagValid({
    each: true,
    message: TaskErrorMessages.TAG_INVALID,
  })
  tags: string[];

  @ApiProperty({
    description: 'The title of a task',
    example: 'Убрать квартиру после вписки',
  })
  @MinLength(MIN_TITLE_LENGTH, {
    message: TaskErrorMessages.TITLE_TOO_SHORT,
  })
  @MaxLength(MAX_TITLE_LENGTH, {
    message: TaskErrorMessages.TITLE_TOO_LONG,
  })
  title: string;
}
