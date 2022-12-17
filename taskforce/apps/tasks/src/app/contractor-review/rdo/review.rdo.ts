import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewRdo {
  @Expose()
  @ApiProperty({
    description: 'Review ID',
    example: '5d77e338-a4c0-47f9-ab5f-08c62ed7909e'
  })
  public id: string;


  @Expose()
  @ApiProperty({
    description: 'Contractor ID',
    example: '31e42365-5502-4238-9233-5b2fe994909f'
  })
  public contractorId: string;

  @Expose()
  @ApiProperty({
    description: 'Task ID',
    example: '51599d01-9abe-4794-9345-ec720c70f042'
  })
  public taskId: string;

  @Expose()
  @ApiProperty({
    description: 'Review text',
    example: 'Кумар сделал всё в лучшем виде. Буду обращаться к нему в будущем, если возникнет такая необходимость!'
  })
  public text: string;

  @Expose()
  @ApiProperty({
    description: 'Contractor rating',
    example: '5'
  })
  public rating: number;
}

