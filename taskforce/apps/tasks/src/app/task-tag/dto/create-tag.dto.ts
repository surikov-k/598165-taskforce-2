import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsTagValid } from '../../validators';

export class CreateTagDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'клининг'
  })
  @Expose()
  @IsTagValid()
  public name: string;
}
