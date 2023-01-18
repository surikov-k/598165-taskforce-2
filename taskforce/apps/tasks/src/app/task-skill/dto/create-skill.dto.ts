import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { IsSkillUnique } from '../../validators';
import { CreateSkillError, SkillLength } from '../task-skill.constants';

export class CreateSkillDto {
  @ApiProperty({
    description: 'Name of the skill',
    example: 'Клининг',
  })
  @Transform(({ value }) => value.trim().replace(/\s+/, ' '))
  @IsString()
  @Length(SkillLength.MIN, SkillLength.MAX)
  @IsSkillUnique({ message: CreateSkillError.NOT_UNIQUE })
  public name: string;
}
