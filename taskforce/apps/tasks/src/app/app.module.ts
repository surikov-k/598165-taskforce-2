import { Module } from '@nestjs/common';
import { WorkTaskModule } from './work-task/work-task.module';
import { TaskReplyModule } from './task-reply/task-reply.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskSkillModule } from './task-skill/task-skill.module';
import { TaskTagModule } from './task-tag/task-tag.module';
import { ContractorReviewModule } from './contractor-review/contractor-review.module';

@Module({
  imports: [
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
