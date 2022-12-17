import { Module } from '@nestjs/common';
import { TaskSkillService } from './task-skill.service';
import { TaskSkillController } from './task-skill.controller';
import { TaskSkillRepository } from './task-skill.repository';

@Module({
  imports: [],
  controllers: [TaskSkillController],
  providers: [TaskSkillService, TaskSkillRepository],
  exports: [TaskSkillRepository]
})
export class TaskSkillModule {}
