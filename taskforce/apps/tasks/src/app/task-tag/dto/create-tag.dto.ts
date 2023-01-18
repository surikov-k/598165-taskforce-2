import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsTagValid } from '../../validators';
import { TaskTagError } from '../task-tag.constants';

export class CreateTagDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'клининг',
  })
  @Expose()
  @IsTagValid({
    message: TaskTagError.TAG_NOT_VALID,
  })
  public name: string;
}
