import { Module } from '@nestjs/common';
import { TaskFileService } from './task-file.service';
import { TaskFileRepository } from './task-file.repository';
import { TaskFileController } from './task-file.controller';
import { WorkTaskRepository } from '../work-task/work-task.repository';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from '../work-task/work-taks.constants';
import { getRabbitMqConfig } from '../../../config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TaskFileController],
  providers: [TaskFileService, TaskFileRepository, WorkTaskRepository],
  exports: [TaskFileRepository],
})
export class TaskFileModule {}
