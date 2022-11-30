import { Module } from '@nestjs/common';
import { TaskReplyModule } from '../task-reply/task-reply.module';
import { ContractorReviewModule } from '../contractor-review/contractor-review.module';
import { WorkTaskController } from './work-task.controller';
import { WorkTaskService } from './work-task.service';
import { WorkTaskMemoryRepository } from './work-task-memory.repository';

@Module({
  imports: [TaskReplyModule, ContractorReviewModule],
  providers: [WorkTaskService, WorkTaskMemoryRepository],
  controllers: [WorkTaskController]
})
export class WorkTaskModule {}
