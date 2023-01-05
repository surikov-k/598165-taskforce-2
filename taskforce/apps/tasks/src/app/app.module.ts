import { Module } from '@nestjs/common';
import { WorkTaskModule } from './work-task/work-task.module';
import { TaskReplyModule } from './task-reply/task-reply.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskSkillModule } from './task-skill/task-skill.module';
import { TaskTagModule } from './task-tag/task-tag.module';
import { ContractorReviewModule } from './contractor-review/contractor-review.module';
import { TaskSkillRepository } from './task-skill/task-skill.repository';

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
  providers: [TaskSkillRepository],
})
export class AppModule {}
