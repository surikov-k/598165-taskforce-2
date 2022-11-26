import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppUserModule } from './app-user/app-user.module';

@Module({
  imports: [AuthModule, AppUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
