import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TokensRdo {
  @ApiProperty({ description: 'Access token', example: '1111' })
  @Expose()
  public accessToken: string;

  @ApiProperty({ description: 'Refresh token', example: '1111' })
  @Expose()
  public refreshToken: string;
}
