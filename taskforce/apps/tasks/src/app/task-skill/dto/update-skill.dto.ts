import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateSkillDto {
  @ApiProperty({
    description: 'Name of the skill',
    example: 'Клининг'
  })
  @Expose()
  public name: string;
}
