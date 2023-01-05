import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@task-force/shared-types';
import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_AGE,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  UserErrorMessage,
} from '../auth.constants';
import { DoesEmailExist, IsOlderThan } from '../../validators';

export class CreateUserDto {
  @ApiProperty({ description: 'User name', example: 'Username' })
  @IsString()
  @MinLength(MIN_NAME_LENGTH, {
    message: UserErrorMessage.NAME_TOO_SHORT,
  })
  @MaxLength(MAX_NAME_LENGTH, {
    message: UserErrorMessage.NAME_TOO_LONG,
  })
  public name: string;

  @ApiProperty({ description: 'User unique email', example: 'user@user.net' })
  @IsEmail(
    {},
    {
      message: UserErrorMessage.EMAIL_NOT_VALID,
    }
  )
  @DoesEmailExist({
    message: UserErrorMessage.EMAIL_EXISTS,
  })
  public email: string;

  @ApiProperty({ description: 'User password', example: '123456' })
  @MinLength(MIN_PASSWORD_LENGTH, {
    message: UserErrorMessage.PASSWORD_TOO_SHORT,
  })
  @MaxLength(MAX_PASSWORD_LENGTH, {
    message: UserErrorMessage.PASSWORD_TOO_LONG,
  })
  public password: string;

  @ApiProperty({ description: 'User city', example: 'Москва' })
  @IsEnum(City, {
    message: UserErrorMessage.CITY_NOT_VALID,
  })
  public city: City;

  @ApiProperty({ description: 'User birth date', example: '1990-02-22' })
  @IsISO8601({ message: UserErrorMessage.BIRTH_DATE_NOT_VALID })
  @IsOlderThan(MIN_AGE, {
    message: UserErrorMessage.AGE_NOT_VALID,
  })
  public birthDate: string;

  @IsEnum(UserRole, {
    message: UserErrorMessage.ROLE_NOT_VALID,
  })
  @ApiProperty({ description: 'User role', example: 'contractor' })
  public role: string;

  public refreshToken;
}
