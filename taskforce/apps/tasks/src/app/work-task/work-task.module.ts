import { Module } from '@nestjs/common';
import { TaskReplyModule } from '../task-reply/task-reply.module';
import { WorkTaskController } from './work-task.controller';
import { WorkTaskService } from './work-task.service';
import { WorkTaskRepository } from './work-task.repository';
import { TaskSkillModule } from '../task-skill/task-skill.module';
import { TaskTagModule } from '../task-tag/task-tag.module';
import { DoesSkillExistConstraint } from '../validators';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './work-taks.constants';
import { getRabbitMqConfig } from '../../../config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TaskReplyModule,
    TaskSkillModule,
    TaskTagModule,
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [WorkTaskController],
  providers: [WorkTaskService, WorkTaskRepository, DoesSkillExistConstraint],
  exports: [WorkTaskRepository],
})
export class WorkTaskModule {}
