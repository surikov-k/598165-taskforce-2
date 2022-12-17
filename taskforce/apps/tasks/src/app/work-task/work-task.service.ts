import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { WorkTaskEntity } from './work-task.entity';
import { TaskStatus } from '@task-force/shared-types';
import { TASK_DOESNT_EXISTS } from './work-taks.constants';
import { WorkTaskRepository } from './work-task.repository';
import { TaskSkillRepository } from '../task-skill/task-skill.repository';
import { TaskTagRepository } from '../task-tag/task-tag.repository';

@Injectable()
export class WorkTaskService {
  constructor(
    private readonly workTaskRepository: WorkTaskRepository,
    private readonly taskSkillRepository: TaskSkillRepository,
    private readonly taskTagRepository: TaskTagRepository,
  ) {}

  public async create(dto: CreateTaskDto) {
    const skills = dto.skills.length === 0 ? [] : await this.taskSkillRepository.find(dto.skills);
    const tags =  dto.tags.length === 0 ? [] : await this.taskTagRepository.find(dto.tags);
   const taskEntity = new WorkTaskEntity({
     ...dto,
     dueDate: new Date(dto.dueDate),
     skills,
     tags,
     replies: []
   })

    return this.workTaskRepository.create(taskEntity);
  }

  public async getOne(id: number) {
    return this.workTaskRepository.findById(id);
  }

  public async getAll() {
    return this.workTaskRepository.find();
  }

  public async changeStatus(id: number, status: TaskStatus) {
    const task = await this.workTaskRepository.findById(id);

    if (!task) {
      throw new Error(TASK_DOESNT_EXISTS);
    }

    const taskEntity =await new WorkTaskEntity(task);

    taskEntity.changeStatus(status);

    return this.workTaskRepository.update(id,taskEntity)
  }

  public async delete(id: number) {
    return this.workTaskRepository.destroy(id);
  }

}
