import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import {
  getMongoDbConfig,
  jwtConfig,
  mongoDbOptions,
  rabbitMqOptions,
} from '../../config';
import { ENV_FILE_PATH } from './app.constants';
import { validateEnvironment } from './env.validation';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [mongoDbOptions, jwtConfig, rabbitMqOptions],
      validate: validateEnvironment,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
