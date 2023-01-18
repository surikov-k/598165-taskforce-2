import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, MaxLength, MinLength } from 'class-validator';
import { CreateReplyError } from '../task-reply.constants';
import { DoesTaskExist } from '../../validators';
import { ReviewText } from '../../contractor-review/contractor-review.constants';

export class CreateReplyDto {
  @ApiProperty({
    description: 'A budget of the task',
    example: '100',
  })
  @IsNumber()
  budget: number;

  @ApiProperty({
    description: 'A text of the task reply',
    example:
      'Могу сделать всё в лучшем виде. У меня есть необходимый опыт и инструменты.',
  })
  @MinLength(ReviewText.MIN, {
    message: CreateReplyError.REPLY_TOO_SHORT,
  })
  @MaxLength(ReviewText.MAX, {
    message: CreateReplyError.REPLY_TOO_LONG,
  })
  comment: string;

  @ApiProperty({
    description: 'Task ID',
    example: '5',
  })
  @IsNumber()
  @DoesTaskExist({
    message: CreateReplyError.TASK_DOESNT_EXIST,
  })
  taskId: number;

  @ApiProperty({
    description: 'User ID',
    example: '638dac5ca3a0dafd519c1827',
  })
  @IsMongoId()
  userId: string;
}
