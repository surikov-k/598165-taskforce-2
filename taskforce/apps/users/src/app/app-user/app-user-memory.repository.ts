import * as crypto from 'crypto'
import { Injectable } from '@nestjs/common';

import { AppUserEntity } from './app-user.entity';
import { CRUDRepository } from '@task-force/core';
import { User } from '@task-force/shared-types';

@Injectable()
export class AppUserMemoryRepository implements CRUDRepository<AppUserEntity, string, User> {
  private repository: {[key: string]: User} = {};

  public async create(item: AppUserEntity):Promise<User> {
    const entry = {...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async findById(id: string): Promise<User> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }
    return null;
  }

  public async findByEmail(email): Promise<User | null> {
    const existedUser = Object.values(this.repository)
    .find((user) => user.email === email);

    if (!existedUser) {
      return null;
    }

    return {...existedUser};
  }

  public async update(id: string, item: AppUserEntity): Promise<User> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }
}
