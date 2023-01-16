import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { WorkTaskEntity } from './work-task.entity';
import { CommandEvent, TaskStatus } from '@task-force/shared-types';
import { RABBITMQ_SERVICE, TASK_DOESNT_EXISTS } from './work-taks.constants';
import { WorkTaskRepository } from './work-task.repository';
import { TaskSkillRepository } from '../task-skill/task-skill.repository';
import { TaskTagRepository } from '../task-tag/task-tag.repository';
import { TaskQuery } from './query/task.query';
import { TaskReplyRepository } from '../task-reply/task-reply.repository';
import { ClientProxy } from '@nestjs/microservices';
import { TaskFileRepository } from '../task-file/task-file.repository';

@Injectable()
export class WorkTaskService {
  constructor(
    private readonly workTaskRepository: WorkTaskRepository,
    private readonly taskSkillRepository: TaskSkillRepository,
    private readonly taskTagRepository: TaskTagRepository,
    private readonly taskReplyRepository: TaskReplyRepository,
    private readonly taskFileRepository: TaskFileRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  public async create(dto: CreateTaskDto) {
    const skills =
      dto.skills.length === 0
        ? []
        : await this.taskSkillRepository.find(dto.skills);

    const tags =
      dto.tags.length === 0
        ? []
        : await this.taskTagRepository.findByNameOrCreate(dto.tags);

    const taskEntity = new WorkTaskEntity({
      ...dto,
      dueDate: new Date(dto.dueDate),
      skills,
      tags,
      replies: [],
      files: [],
    });

    return this.workTaskRepository.create(taskEntity);
  }

  public async getOne(id: number) {
    return this.workTaskRepository.findById(id);
  }

  public async getAll(query: TaskQuery) {
    return this.workTaskRepository.find(query);
  }

  public async changeStatus(id: number, status: TaskStatus) {
    const task = await this.workTaskRepository.findById(id);

    if (!task) {
      throw new Error(TASK_DOESNT_EXISTS);
    }

    const taskEntity = await new WorkTaskEntity(task);

    taskEntity.changeStatus(status);

    return this.workTaskRepository.update(id, taskEntity);
  }

  public async delete(id: number) {
    return this.workTaskRepository.destroy(id);
  }

  public async update(id, dto: UpdateTaskDto) {
    const task = await this.workTaskRepository.findById(id);
    let { skills, tags } = task;

    if (dto.skills) {
      skills =
        dto.skills.length === 0
          ? []
          : await this.taskSkillRepository.find(dto.skills);
    }

    if (dto.tags) {
      tags =
        dto.tags.length === 0
          ? []
          : await this.taskTagRepository.findByNameOrCreate(dto.tags);
    }

    const taskEntity = new WorkTaskEntity({
      ...task,
      ...dto,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : new Date(task.dueDate),
      skills,
      tags,
    });
    return this.workTaskRepository.update(id, taskEntity);
  }

  public async getNewTasks(date, email) {
    const tasks = await this.workTaskRepository.getNew(date);
    this.rabbitClient.emit({ cmd: CommandEvent.GetNewTasks }, { tasks, email });
  }
}
