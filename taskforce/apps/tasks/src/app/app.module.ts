import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { WorkTaskModule } from './work-task/work-task.module';
import { TaskReplyModule } from './task-reply/task-reply.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskSkillModule } from './task-skill/task-skill.module';
import { TaskTagModule } from './task-tag/task-tag.module';
import { ContractorReviewModule } from './contractor-review/contractor-review.module';
import { ENV_FILE_PATH } from './app.constants';
import { rabbitMqOptions } from '../../config';
import { validateEnvironment } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [rabbitMqOptions],
      validate: validateEnvironment,
    }),
    WorkTaskModule,
    ContractorReviewModule,
    TaskReplyModule,
    PrismaModule,
    TaskSkillModule,
    TaskTagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
