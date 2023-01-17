import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppUserModule } from '../app-user/app-user.module';
import {
  DoesEmailExistConstraint,
  IsPasswordCorrectConstraint,
} from '../validators';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { getRabbitMqConfig } from '../../config';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './auth.constants';

@Module({
  imports: [
    AppUserModule,
    PassportModule,
    JwtModule.register({}),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    DoesEmailExistConstraint,
    IsPasswordCorrectConstraint,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
