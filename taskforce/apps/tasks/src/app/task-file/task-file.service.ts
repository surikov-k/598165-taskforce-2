import { Injectable } from '@nestjs/common';
import { SaveTaskFileDto } from '../work-task/dto';
import { TaskFileRepository } from './task-file.repository';
import { WorkTaskRepository } from '../work-task/work-task.repository';
import { TaskFileEntity } from './task-file.entity';

@Injectable()
export class TaskFileService {
  constructor(
    private readonly taskFileRepository: TaskFileRepository,
    private readonly workTaskRepository: WorkTaskRepository
  ) {}

  public async create(dto: SaveTaskFileDto) {
    const { taskId, userId, filename } = dto;

    const task = await this.workTaskRepository.findById(taskId);

    if (!task || task.clientId !== userId) {
      return null;
    }

    const fileEntity = new TaskFileEntity({
      taskId,
      filename,
    });

    return this.taskFileRepository.create(fileEntity);
  }
}
