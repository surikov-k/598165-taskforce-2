import { CRUDRepository } from '@task-force/core';
import { TaskFileEntity } from './task-file.entity';
import { TaskFile } from '@task-force/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskFileRepository
  implements CRUDRepository<TaskFileEntity, number, TaskFile>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskFileEntity): Promise<TaskFile> {
    return this.prisma.file.create({
      data: { ...item.toObject() },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.file.delete({
      where: { id },
    });
  }

  public async find(ids: number[] = []) {
    return this.prisma.file.findMany({
      where: {
        id: { in: ids.length > 0 ? ids : undefined },
      },
    });
  }

  public async findById(id: number): Promise<TaskFile | null> {
    return this.prisma.file.findFirst({
      where: { id },
    });
  }
}
