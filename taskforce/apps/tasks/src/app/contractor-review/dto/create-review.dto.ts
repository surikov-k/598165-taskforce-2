import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  ContractorRating,
  CreateReviewError,
  ReviewText,
} from '../contractor-review.constants';
import { DoesTaskExist } from '../../validators';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Contractor rating',
    example: '5',
  })
  @IsNumber()
  @Min(ContractorRating.MIN, {
    message: CreateReviewError.RATING_TOO_LOW,
  })
  @Max(ContractorRating.MAX, {
    message: CreateReviewError.RATING_TOO_HIGH,
  })
  rating: number;

  @ApiProperty({
    description: 'Task ID',
    example: '51',
  })
  @IsNumber()
  @DoesTaskExist({
    message: CreateReviewError.TASK_DOESNT_EXIST,
  })
  taskId: number;

  @ApiProperty({
    description: 'Contractor ID',
    example: '638dac5ca3a0dafd519c1829',
  })
  @IsMongoId()
  contractorId: string;

  @ApiProperty({
    description: 'Review text',
    example:
      'Кумар сделал всё в лучшем виде. Буду обращаться к нему в будущем, если возникнет такая необходимость!',
  })
  @MinLength(ReviewText.MIN, {
    message: CreateReviewError.TEXT_TOO_SHORT,
  })
  @MaxLength(ReviewText.MAX, {
    message: CreateReviewError.TEXT_TOO_LONG,
  })
  text: string;
}
