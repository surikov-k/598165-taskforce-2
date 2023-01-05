import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config';

@Module({
  imports: [
    AppUserModule,
    HttpModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
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
