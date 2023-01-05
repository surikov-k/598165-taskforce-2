import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { IsSkillUnique } from '../../validators';
import { CreateSkillError, MAX_SKILL_LENGTH, MIN_SKILL_LENGTH } from '../task-skill.constants';

export class CreateSkillDto {
  @ApiProperty({
    description: 'Name of the skill',
    example: 'Клининг'
  })
  @Transform(({ value }) => value.trim().replace(/\s+/, ' '))
  @IsString()
  @Length(MIN_SKILL_LENGTH, MAX_SKILL_LENGTH)
  @IsSkillUnique({ message: CreateSkillError.NOT_UNIQUE })
  public name: string;
}
