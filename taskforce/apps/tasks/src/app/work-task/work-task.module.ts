import { Module } from '@nestjs/common';
import { TaskReplyModule } from '../task-reply/task-reply.module';
import { WorkTaskController } from './work-task.controller';
import { WorkTaskService } from './work-task.service';
import { WorkTaskRepository } from './work-task.repository';
import { TaskSkillModule } from '../task-skill/task-skill.module';
import { TaskTagModule } from '../task-tag/task-tag.module';

@Module({
  imports: [TaskReplyModule, TaskSkillModule, TaskTagModule],
  controllers: [WorkTaskController],
  providers: [WorkTaskService, WorkTaskRepository],
})
export class WorkTaskModule { }
