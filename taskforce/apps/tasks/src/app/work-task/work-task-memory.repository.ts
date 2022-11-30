import * as crypto from 'crypto';
import { CRUDRepository } from '@task-force/core';
import { WorkTaskEntity } from './work-task.entity';
import { Task } from '@task-force/shared-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkTaskMemoryRepository implements CRUDRepository<WorkTaskEntity, string, Task> {

  private repository: {[key: string]: Task} = {};

  public async create(item: WorkTaskEntity): Promise<Task> {
    const entry = {...item.toObject(), id: crypto.randomUUID()}
    this.repository[entry.id] = entry;
    return {...entry}
  }

  public async destroy(id: string): Promise<void> {
   delete this.repository[id];
  }

  public async findById(id: string): Promise<Task | null> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }
    return null;
  }

  public async update(id: string, item: WorkTaskEntity): Promise<Task> {
    this.repository[id] = {...item.toObject(), id};
    return this.findById(id);
  }

  public async findAll() {
    return Object.values(this.repository);
  }

  public async findByClient(clientId: string) {
    return Object
      .values(this.repository)
      .filter((task) => task.clientId === clientId);
  }

  public async findByContractor(contractorId: string) {
    return Object
      .values(this.repository)
      .filter((task) => task.contractorId === contractorId);
  }
}
