import { Injectable } from '@nestjs/common';
import { WorkTaskMemoryRepository } from './work-task-memory.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import * as dayjs from 'dayjs';
import { WorkTaskEntity } from './work-task.entity';
import { TaskStatus } from '@task-force/shared-types';
import { TASK_DOESNT_EXISTS } from './work-taks.constants';

@Injectable()
export class WorkTaskService {
  constructor(
    private readonly workTaskRepository: WorkTaskMemoryRepository,
  ) {}

  public async create(dto: CreateTaskDto) {
    const {address,
      budget,
      clientId,
      description,
      dueDate,
      image,
      skills,
      title} = dto;

    const workTask = {
      address,
      budget,
      clientId,
      description,
      dueDate : dayjs(dueDate).toDate(),
      contractorId: null,
      status: TaskStatus.New,
      created: dayjs().toDate(),
      image,
      skills,
      title,
    }

    const workTaskEntity = new WorkTaskEntity(workTask)
    return this.workTaskRepository.create(workTaskEntity);
  }

  public async getOne(id: string) {
    return this.workTaskRepository.findById(id);
  }

  public async getAll() {
    return this.workTaskRepository.findAll();
  }

  public async getAllByClient(clientId: string) {
    return this.workTaskRepository.findByClient(clientId);
  }

  public async getAllByContractor(contractorId: string) {
    return this.workTaskRepository.findByContractor(contractorId);
  }

  public async changeStatus(taskId: string, status: TaskStatus) {
    const task = await this.workTaskRepository.findById(taskId);

    if (!task) {
      throw new Error(TASK_DOESNT_EXISTS);
    }

    const taskEntity =await new WorkTaskEntity(task);

    taskEntity.changeStatus(status);

    return this.workTaskRepository.update(taskId,taskEntity)
  }

  public async delete(taskId: string) {
    return this.workTaskRepository.destroy(taskId);
  }

}
