import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModel, UploadSchema } from './upload.model';
import { UploadRepository } from './upload.repository';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from '../../../strategies';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { getRabbitMqConfig } from '../../../config';
import { RABBITMQ_SERVICE } from './upload.constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UploadModel.name,
        schema: UploadSchema,
      },
    ]),
    JwtModule.register({}),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UploadController],
  providers: [UploadService, UploadRepository, AccessTokenStrategy],
})
export class UploadModule {}
