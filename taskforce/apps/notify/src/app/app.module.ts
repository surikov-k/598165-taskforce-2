import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import {
  getMongoDbConfig,
  jwtConfig,
  mailOptions,
  mongoDbOptions,
  rabbitMqOptions,
} from '../../config';
import { MongooseModule } from '@nestjs/mongoose';
import { validateEnvironment } from './env.validation';
import { AccessTokenStrategy } from './email-subscriber/strategies/access-token.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ENV_FILE_PATH,
      load: [mongoDbOptions, rabbitMqOptions, mailOptions, jwtConfig],
      validate: validateEnvironment,
    }),
    EmailSubscriberModule,
    MongooseModule.forRootAsync(getMongoDbConfig()),
  ],
  controllers: [],
  providers: [AccessTokenStrategy],
})
export class AppModule {}
