import {Expose} from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';
export class LoggedUserRdo {
  @ApiProperty({description: 'Unique user Id', example: '12'})
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({description: 'User email', example: 'user@user.net'})
  @Expose()
  public email: string;

  @ApiProperty({description: 'Access token', example: '1111'})
  @Expose()
  public accessToken: string;
}
