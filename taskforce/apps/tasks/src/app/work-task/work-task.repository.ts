import { CRUDRepository } from '@task-force/core';
import { WorkTaskEntity } from './work-task.entity';
import { Task, TaskStatus } from '@task-force/shared-types';
import { Injectable } from '@nestjs/common';
import { TaskQuery } from './query';
import { TaskSorting } from './work-taks.constants';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkTaskRepository
  implements CRUDRepository<WorkTaskEntity, number, Task>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: WorkTaskEntity): Promise<Task> {
    const entityData = item.toObject();

    return this.prisma.task.create({
      data: {
        ...entityData,
        skills: {
          connect: [...entityData.skills],
        },
        replies: {
          connect: [],
        },
        tags: {
          connect: [...entityData.tags],
        },
        files: {
          connect: [...entityData.files],
        },
      },
      include: {
        skills: true,
        tags: true,
        replies: true,
        files: true,
      },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }

  public async findById(id: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: { id },
      include: {
        replies: true,
        skills: true,
        tags: true,
        files: true,
      },
    });
  }

  public async find({ limit, sort = TaskSorting.Date, page }: TaskQuery) {
    const selectSorting = {
      created: { created: 'desc' },
      replies: { replies: { _count: 'desc' } },
    };
    return this.prisma.task.findMany({
      take: limit,
      include: {
        replies: true,
        skills: true,
        tags: true,
        files: true,
      },
      orderBy: selectSorting[sort],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findNew({
    limit,
    skills,
    tags,
    city,
    sort = TaskSorting.Date,
    page,
  }: TaskQuery): Promise<Task[]> {
    const selectOptions: unknown[] = [{ status: TaskStatus.New }];

    const selectSorting = {
      created: { created: 'desc' },
      replies: { replies: { _count: 'desc' } },
    };

    if (skills?.length) {
      selectOptions.push({ skills: { some: { id: { in: skills } } } });
    }

    if (tags?.length) {
      selectOptions.push({ tags: { some: { id: { in: tags } } } });
    }
    if (city) {
      selectOptions.push({ city });
    }

    return this.prisma.task.findMany({
      where: {
        AND: selectOptions,
      },
      take: limit,
      include: {
        replies: true,
        skills: true,
        tags: true,
        files: true,
      },
      orderBy: selectSorting[sort],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findContractorTasks(userId, query) {
    const { status, limit, page } = query;
    const selectOptions: unknown[] = [{ contractorId: userId }];
    if (status) {
      selectOptions.push({ status });
    }
    return this.prisma.task.findMany({
      where: {
        AND: selectOptions,
      },
      orderBy: { status: 'desc' },
      take: limit,
      include: {
        replies: true,
        skills: true,
        tags: true,
        files: true,
      },
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findClientTasks(userId, query) {
    const { status, limit, page } = query;
    const selectOptions: unknown[] = [{ clientId: userId }];
    if (status) {
      selectOptions.push({ status });
    }
    return this.prisma.task.findMany({
      where: {
        AND: selectOptions,
      },
      orderBy: { created: 'desc' },
      take: limit,
      include: {
        replies: true,
        skills: true,
        tags: true,
        files: true,
      },
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async getNew(date): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        AND: [
          { status: TaskStatus.New },
          {
            created: { gte: new Date(date) },
          },
        ],
      },
    });
  }

  public async update(id: number, item: WorkTaskEntity): Promise<Task> {
    const entityData = item.toObject();
    return this.prisma.task.update({
      where: { id },
      data: {
        ...entityData,
        skills: {
          connect: [...entityData.skills],
        },
        replies: {
          connect: [],
        },
        tags: {
          connect: [...entityData.tags],
        },
        files: {
          connect: [...entityData.files],
        },
      },
      include: {
        skills: true,
        tags: true,
        replies: true,
        files: true,
      },
    });
  }

  public async countFinishingTask(contractorId) {
    return this.prisma.task.count({
      where: {
        AND: [
          { contractorId },
          { status: { in: [TaskStatus.Done, TaskStatus.Failed] } },
        ],
      },
    });
  }
}
