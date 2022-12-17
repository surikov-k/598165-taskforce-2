import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Contractor rating',
    example: '5'
  })
  rating: number;

  @ApiProperty({
    description: 'Task ID',
    example: '51'
  })
  taskId: number;

  @ApiProperty({
    description: 'Contractor ID',
    example: '51599d01-9abe-4794-9345-ec720c70f042'
  })
  contractorId: string;

  @ApiProperty({
    description: 'Review text',
    example: 'Кумар сделал всё в лучшем виде. Буду обращаться к нему в будущем, если возникнет такая необходимость!'
  })
  text: string;
}
