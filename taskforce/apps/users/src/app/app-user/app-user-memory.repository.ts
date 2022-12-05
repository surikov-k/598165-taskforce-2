import {randomUUID} from 'crypto'
import { Injectable } from '@nestjs/common';

import { AppUserEntity } from './app-user.entity';
import { CRUDRepository } from '@task-force/core';
import { User } from '@task-force/shared-types';

@Injectable()
export class AppUserMemoryRepository implements CRUDRepository<AppUserEntity, string, User> {
  private repository = new Map<string, User>();

  public async create(item: AppUserEntity):Promise<User> {
    const entry = {...item.toObject(), _id: randomUUID()};
    this.repository.set(entry._id, entry)

    return {...entry};
  }

  public async findById(id: string): Promise<User> {
    if (this.repository.get(id)) {
      return { ...this.repository.get(id) };
    }
    return null;
  }

  public async findByEmail(email): Promise<User | null> {
    const existedUser = [...this.repository.values()]
    .find((user) => user.email === email);

    if (!existedUser) {
      return null;
    }

    return {...existedUser};
  }

  public async update(id: string, item: AppUserEntity): Promise<User> {
    this.repository.set(id, {...item.toObject(), _id: id})
    return this.findById(id);
  }

  public async destroy(id: string): Promise<void> {
    this.repository.delete(id);
  }
}
