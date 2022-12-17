import { Module } from '@nestjs/common';
import { TaskTagService } from './task-tag.service';
import { TaskTagController } from './task-tag.controller';
import { TaskTagRepository } from './task-tag.repository';

@Module({
  imports: [],
  controllers: [TaskTagController],
  providers: [TaskTagService, TaskTagRepository],
  exports: [TaskTagRepository]
})
export class TaskTagModule {
}
