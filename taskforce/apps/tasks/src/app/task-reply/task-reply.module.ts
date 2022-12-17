import { Module } from '@nestjs/common';
import { TaskReplyService } from './task-reply.service';
import { TaskReplyController } from './task-reply.controller';
import { TaskReplyRepository } from './task-reply.repository';

@Module({
  controllers: [TaskReplyController],
  providers: [TaskReplyService, TaskReplyRepository],
  exports: [TaskReplyRepository],
})
export class TaskReplyModule {}
