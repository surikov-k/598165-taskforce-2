import { randomUUID } from 'crypto';
import { CRUDRepository } from '@task-force/core';
import { WorkTaskEntity } from './work-task.entity';
import { Task } from '@task-force/shared-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkTaskMemoryRepository implements CRUDRepository<WorkTaskEntity, string, Task> {

  private repository = new Map<string, Task>();

  public async create(item: WorkTaskEntity): Promise<Task> {
    const entry = {...item.toObject(), id: randomUUID()}
    this.repository.set(entry.id, entry);
    return {...entry}
  }

  public async destroy(id: string): Promise<void> {
   this.repository.delete(id);
  }

  public async findById(id: string): Promise<Task | null> {
    if (this.repository.get(id)) {
      return {...this.repository.get(id)};
    }
    return null;
  }

  public async update(id: string, item: WorkTaskEntity): Promise<Task> {
    this.repository.set(id, {...item.toObject(), id}) ;
    return this.findById(id);
  }

  public async findAll() {
    return [...this.repository.values()];
  }
}
