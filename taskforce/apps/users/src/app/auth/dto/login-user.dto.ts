import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { UserErrorMessage } from '../auth.constants';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.net',
  })
  @IsEmail(
    {},
    {
      message: UserErrorMessage.EMAIL_NOT_VALID,
    }
  )
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  public password: string;
}
