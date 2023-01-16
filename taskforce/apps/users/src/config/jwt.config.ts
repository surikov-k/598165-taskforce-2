import { ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = registerAs('jwt', () => ({
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
}));

export async function getJwtConfig(
  configService: ConfigService
): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.secret'),
    signOptions: { expiresIn: '60s', algorithm: 'HS256' },
  };
}
