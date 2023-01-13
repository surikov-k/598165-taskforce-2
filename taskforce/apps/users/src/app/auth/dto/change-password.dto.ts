import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, MaxLength, MinLength } from 'class-validator';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  UserErrorMessage,
} from '../auth.constants';
import { IsPasswordCorrect } from '../../validators';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User ID',
    example: '63a16cbd74d99c8382e73d46',
  })
  @IsMongoId()
  public id: string;

  @ApiProperty({ description: 'Current password', example: '123456' })
  @MinLength(MIN_PASSWORD_LENGTH, {
    message: UserErrorMessage.PASSWORD_TOO_SHORT,
  })
  @MaxLength(MAX_PASSWORD_LENGTH, {
    message: UserErrorMessage.PASSWORD_TOO_LONG,
  })
  @IsPasswordCorrect({
    message: 'Current password is incorrect',
  })
  public currentPassword: string;

  @ApiProperty({ description: 'New password', example: 'abcdef' })
  @MinLength(MIN_PASSWORD_LENGTH, {
    message: UserErrorMessage.PASSWORD_TOO_SHORT,
  })
  @MaxLength(MAX_PASSWORD_LENGTH, {
    message: UserErrorMessage.PASSWORD_TOO_LONG,
  })
  public newPassword: string;
}
