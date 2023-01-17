import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';
import {
  CreateReviewError,
  MAX_CONTRACTOR_RATING,
  MAX_REVIEW_TEXT,
  MIN_CONTRACTOR_RATING,
  MIN_REVIEW_TEXT,
} from '../../contractor-review/contractor-review.constants';

export class FinishTaskDto {
  @ApiProperty({
    description: 'Contractor rating',
    example: '5',
  })
  @IsNumber()
  @Min(MIN_CONTRACTOR_RATING, {
    message: CreateReviewError.RATING_TOO_LOW,
  })
  @Max(MAX_CONTRACTOR_RATING, {
    message: CreateReviewError.RATING_TOO_HIGH,
  })
  rating: number;

  @ApiProperty({
    description: 'Review text',
    example:
      'Кумар сделал всё в лучшем виде. Буду обращаться к нему в будущем, если возникнет такая необходимость!',
  })
  @MinLength(MIN_REVIEW_TEXT, {
    message: CreateReviewError.TEXT_TOO_SHORT,
  })
  @MaxLength(MAX_REVIEW_TEXT, {
    message: CreateReviewError.TEXT_TOO_LONG,
  })
  text: string;
}
