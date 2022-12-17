import { CRUDRepository } from '@task-force/core';
import { TaskTagEntity } from './task-tag.entity';
import { Tag } from '@task-force/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskTagRepository implements CRUDRepository<TaskTagEntity, number, Tag> {
  constructor(private readonly prisma: PrismaService) {
  }

  public async create(item: TaskTagEntity): Promise<Tag> {
    return this.prisma.tag.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.tag.delete({
      where: {id}
    })
  }

  public async findById(id: number): Promise<Tag | null> {
    return this.prisma.tag.findFirst({
      where: {id}
    });
  }

  public  async find(ids: number[] = []): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      where: {
        id: { in: ids.length > 0 ? ids : undefined}
      }
    })
  }

  public async update(id: number, item: TaskTagEntity): Promise<Tag> {
    return this.prisma.tag.update({
      where: { id },
      data: {...item.toObject(), id}
    });
  }
}
