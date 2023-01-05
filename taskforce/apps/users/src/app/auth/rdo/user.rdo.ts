import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Skill } from '@task-force/shared-types';

export class UserRdo {
  @ApiProperty({
    description: 'Unique user ID',
    example: '63a171ab88a698517390456b'}
  )
  @Transform(({obj}) => obj._id.toString())
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

  @ApiProperty({
    description: 'User birth date (ISO format)',
    example: '1981-02-12'
  })
  @Expose()
  public birthDate: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'images/user.jpg'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({description: 'User role', example: 'contractor'})
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'User phone number',
    example: '8-915-234-56-78'
  })
  @Expose()
  public phone: string

  @ApiProperty({
    description: 'Username in telegram',
    example: 'username'
  })
  @Expose()
  public telegram: string;

  @ApiProperty({
    description: 'List of user skill IDs',
    example: ['1', '2']
  })
  @Expose()
  public skills: Skill[];
}
