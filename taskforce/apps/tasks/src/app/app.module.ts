import { Module } from '@nestjs/common';
import { WorkTaskModule } from './work-task/work-task.module';
import { TaskReplyModule } from './task-reply/task-reply.module';
import { ContractorReviewModule } from './contractor-review/contractor-review.module';

@Module({
  imports: [WorkTaskModule, TaskReplyModule, ContractorReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
