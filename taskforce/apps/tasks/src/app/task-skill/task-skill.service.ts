import { Injectable } from '@nestjs/common';
import { TaskSkillRepository } from './task-skill.repository';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Skill } from '@task-force/shared-types';
import { TaskSkillEntity } from './task-skill.entity';

@Injectable()
export class TaskSkillService {
  constructor(private readonly taskSkillRepository: TaskSkillRepository) {}

  public async createSkill(dto: CreateSkillDto): Promise<Skill> {
    const skillEntity = new TaskSkillEntity(dto);
    return this.taskSkillRepository.create(skillEntity);
  }

  public async deleteSkill(id: number): Promise<void> {
    await this.taskSkillRepository.destroy(id);
  }

  public async getSkill(id: number): Promise<Skill> {
    return this.taskSkillRepository.findById(id);
  }

  public async getSkills(skillsId: number[]): Promise<Skill[]> {
    return this.taskSkillRepository.find(skillsId);
  }

  public async updateSkill(id: number, dto: CreateSkillDto): Promise<Skill> {
    return this.taskSkillRepository.update(id, new TaskSkillEntity(dto));
  }
}
