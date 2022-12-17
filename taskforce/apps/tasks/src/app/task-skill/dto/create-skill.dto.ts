import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateSkillDto {
  @ApiProperty({
    description: 'Name of the skill',
    example: 'Клининг'
  })
  @Expose()
  public name: string;
}
