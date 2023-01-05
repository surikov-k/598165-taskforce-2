import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '@task-force/shared-types';
import { AppUserRepository } from '../../app-user/app-user.repository';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly appUserRepository: AppUserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.accessTokenSecret'),
    });
  }

  async validate({ email, name, sub }: JwtPayload) {
    const user = await this.appUserRepository.findById(sub);
    if (!user || !user.refreshTokenHash) {
      return false;
    }
    return {
      email,
      name,
      sub,
      role: user.role,
      test: 'Younglings, younglings gather ’round.',
    };
  }
}
