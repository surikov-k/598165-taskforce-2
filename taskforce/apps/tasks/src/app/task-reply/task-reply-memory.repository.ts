import { randomUUID } from 'crypto';
import { CRUDRepository } from '@task-force/core';
import { Reply } from '@task-force/shared-types';
import { TaskReplyEntity } from './task-reply.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskReplyMemoryRepository implements CRUDRepository<TaskReplyEntity, string, Reply> {
  private repository = new Map<string, Reply>();

  public async create(item: TaskReplyEntity): Promise<Reply> {
    const entry = { ...item.toObject(), id: randomUUID() }
    this.repository.set(entry.id, entry);
    return { ...entry }
  }

  public async destroy(id: string): Promise<void> {
    this.repository.delete(id);
  }

  public async findById(id: string): Promise<Reply | null> {
    if (this.repository.get(id)) {
      return { ...this.repository.get(id) };
    }
    return null;
  }

  public async update(id: string, item: TaskReplyEntity): Promise<Reply> {
    this.repository.set(id, {...item.toObject(), id })
    return this.findById(id);
  }
}
