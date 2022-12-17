import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SkillRdo {
  @ApiProperty({
    description: 'Skill name',
    example: 'Клининг'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Skill ID',
    example: '1'
  })
  @Expose()
  public id: string;
}
