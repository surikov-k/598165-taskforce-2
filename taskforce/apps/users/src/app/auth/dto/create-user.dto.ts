import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User name', example: 'Username' })
  public name: string;

  @ApiProperty({ description: 'User unique email', example: 'user@user.net' })
  public email: string;

  @ApiProperty({ description: 'User password', example: '123456' })
  public password: string;

  @ApiProperty({ description: 'User city', example: 'Moscow' })
  public city: string;

  @ApiProperty({ description: 'User birth date', example: '2012-02-22' })
  public birthDate: string;

  @ApiProperty({ description: 'User avatar', example: 'avatar.jpg' })
  public avatar?: string;

  @ApiProperty({ description: 'User role', example: 'contractor' })
  public role: string;
}
