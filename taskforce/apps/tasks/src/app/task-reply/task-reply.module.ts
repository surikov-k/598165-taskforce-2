import { Module } from '@nestjs/common';
import { TaskReplyMemoryRepository } from './task-reply-memory.repository';
import { TaskReplyService } from './task-reply.service';
import { TaskReplyController } from './task-reply.controller';

@Module({
  controllers: [TaskReplyController],
  providers: [TaskReplyService, TaskReplyMemoryRepository],
  exports: [TaskReplyMemoryRepository],
})
export class TaskReplyModule {}
