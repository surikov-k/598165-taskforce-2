import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';
import {
  ContractorRating,
  CreateReviewError,
  ReviewText,
} from '../../contractor-review/contractor-review.constants';

export class FinishTaskDto {
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
