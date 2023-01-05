import { CRUDRepository } from '@task-force/core';
import { WorkTaskEntity } from './work-task.entity';
import { Task, TaskStatus } from '@task-force/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskQuery } from './query/task.query';
import { TaskSorting } from './work-taks.constants';

@Injectable()
export class WorkTaskRepository implements CRUDRepository<WorkTaskEntity, number, Task> {

  constructor(private readonly prisma: PrismaService) {
  }

  public async create(item: WorkTaskEntity): Promise<Task> {
    const entityData = item.toObject();

    return this.prisma.task.create({
      data: {
        ...entityData,
        skills: {
          connect: [...entityData.skills]
        },
        replies: {
          connect: []
        },
        tags: {
          connect: [...entityData.tags]
        }
      },
      include: {
        skills: true,
        tags: true,
        replies: true,
      }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: { id }
    })
  }

  public async findById(id: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: { id },
      include: {
        replies: true,
        skills: true,
        tags: true,
      }
    });
  }

  public async find({ limit, skills, tags, sort = TaskSorting.Date, page }: TaskQuery): Promise<Task[]> {
    const selectSorting = {
      created: { created: 'desc' },
      replies: { replies: { _count: 'desc' } },
      // comments: { comments: { _count: 'desc' } },
    }
    return this.prisma.task.findMany({
      where: {
        AND: [
          { status: TaskStatus.New },
          { skills: { some: { id: { in: skills } } } },
          { tags: { some: { id: { in: tags } } } }
        ]
      },
      take: limit,
      include: {
        replies: true,
        skills: true,
        tags: true,
      },
      orderBy: selectSorting[sort],
      skip: page > 0 ? limit * (page - 1) : undefined,
    })
  }

  public async findByContractorId (contractorId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        contractorId
      }
    });
  }

  public async update(id: number, item: WorkTaskEntity): Promise<Task> {
    const entityData = item.toObject();
    return this.prisma.task.update({
      where: { id }, data: {
        ...entityData,
        skills: {
          connect: [...entityData.skills]
        },
        replies: {
          connect: []
        },
        tags: {
          connect: [...entityData.tags]
        }
      },
      include: {
        skills: true,
        tags: true,
        replies: true,
      }
    });
  }
}
