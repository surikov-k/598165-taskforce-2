import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({description: 'Unique user ID', example: '13'})
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({description: 'User name', example: 'User'})
  @Expose()
  public name: string;

  @ApiProperty({description: 'User email', example: 'user@user.net'})
  @Expose()
  public email: string;

  @ApiProperty({description: 'User city', example: 'Moscow'})
  @Expose()
  public city: string;

  @ApiProperty({description: 'User birth date (ISO format)', example: '1981-02-12'})
  @Expose()
  public birthDate: string;

  @ApiProperty({description: 'User avatar', example: 'images/user.jpg'})
  @Expose()
  public avatar: string;

  @ApiProperty({description: 'User role', example: 'contractor'})
  @Expose()
  public role: string;
}
