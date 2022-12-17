import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateTagDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'клининг'
  })
  @Expose()
  public name: string;
}
