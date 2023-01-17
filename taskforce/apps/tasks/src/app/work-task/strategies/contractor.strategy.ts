import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, UserRole } from '@task-force/shared-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractorStrategy extends PassportStrategy(
  Strategy,
  'contractor'
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.accessTokenSecret'),
    });
  }

  async validate({ email, name, sub, role }: JwtPayload) {
    if (role !== UserRole.Contractor) {
      return false;
    }
    return { email, name, sub, role };
  }
}
