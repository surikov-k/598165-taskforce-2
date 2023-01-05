import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppUserModule } from './app-user/app-user.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constants';
import databaseConfig from '../config/database.config';
import { validateEnvironments } from './env.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig, jwtConfig } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtConfig],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    AuthModule,
    AppUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
