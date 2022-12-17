import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateTagDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'клининг'
  })
  @Expose()
  public name: string;
}
