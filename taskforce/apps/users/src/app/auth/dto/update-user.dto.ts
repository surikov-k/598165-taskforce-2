import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  Matches,
  MaxLength,
} from 'class-validator';
import {
  MAX_ABOUT_LENGTH,
  MAX_SKILLS_NUMBER,
  UserErrorMessage,
} from '../auth.constants';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'password', 'role'] as const)
) {
  @ApiProperty({
    description: 'User avatar',
    example: 'avatar.jpg',
  })
  @IsOptional()
  @Matches(/\.(jpg|jpeg|png)$/i, {
    message: UserErrorMessage.AVATAR_WRONG_TYPE,
  })
  public avatar?: string;

  @ApiProperty({
    description: 'User phone number',
    example: '8-915-234-56-78',
  })
  @IsOptional()
  @IsPhoneNumber('RU')
  public phone: string;

  @ApiProperty({
    description: 'Username in telegram',
    example: 'username',
  })
  @IsOptional()
  @Matches(/\w{5,}/, {
    message: UserErrorMessage.TELEGRAM_NOT_VALID,
  })
  public telegram: string;

  @ApiProperty({
    description: 'List of user skill IDs',
    example: ['1', '2'],
  })
  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  @ArrayMaxSize(MAX_SKILLS_NUMBER, {
    message: UserErrorMessage.TOO_MANY_SKILLS,
  })
  public skills: string[];

  @ApiProperty({
    description: 'Information about the user',
    example:
      'Внезапно, ключевые особенности структуры проекта неоднозначны и будут подвергнуты целой серии независимых исследований.',
  })
  @IsOptional()
  @MaxLength(MAX_ABOUT_LENGTH, {
    message: UserErrorMessage.ABOUT_TOO_LONG,
  })
  public about: string;

  @IsOptional()
  public refreshTokenHash: string;
}
