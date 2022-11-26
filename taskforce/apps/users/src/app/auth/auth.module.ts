import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppUserModule } from '../app-user/app-user.module';

@Module({
  imports: [AppUserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
