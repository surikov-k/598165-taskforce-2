import { CRUDRepository } from '@task-force/core';
import { Reply } from '@task-force/shared-types';
import { TaskReplyEntity } from './task-reply.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskReplyRepository implements CRUDRepository<TaskReplyEntity, number, Reply> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskReplyEntity): Promise<Reply> {
    return this.prisma.reply.create({data: { ...item.toObject() }});
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.reply.delete({
      where: {id}
    });
  }

  public async findById(id: number): Promise<Reply | null> {
    return this.prisma.reply.findFirst({
      where: {id}
    });
  }

  public async find(ids: number[] = []): Promise<Reply[]> {
    return this.prisma.reply.findMany({
      where: {
        id: {in: ids.length > 0 ? ids: undefined}
      }
    })
  }
}
