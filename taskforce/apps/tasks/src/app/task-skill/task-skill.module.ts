import { Module } from '@nestjs/common';
import { TaskSkillService } from './task-skill.service';
import { TaskSkillController } from './task-skill.controller';
import { TaskSkillRepository } from './task-skill.repository';
import { IsSkillUniqueConstraint } from '../validators';

@Module({
  imports: [],
  controllers: [TaskSkillController],
  providers: [TaskSkillService, TaskSkillRepository, IsSkillUniqueConstraint],
  exports: [TaskSkillRepository]
})
export class TaskSkillModule {}
