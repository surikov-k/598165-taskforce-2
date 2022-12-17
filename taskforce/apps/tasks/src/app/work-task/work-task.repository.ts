import { CRUDRepository } from '@task-force/core';
import { WorkTaskEntity } from './work-task.entity';
import { Task } from '@task-force/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
      where: {id}
    })
  }

  public async findById(id: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {id},
      include: {
        replies: true,
        skills: true,
        tags: true,
      }
    });
  }

  public async find(): Promise<Task[]> {
    return this.prisma.task.findMany({
      include: {
        replies: true,
        skills: true,
        tags: true,
      }
    })
  }

  public async update(id: number, item: WorkTaskEntity): Promise<Task> {
    return Promise.resolve(undefined);
  }
}
