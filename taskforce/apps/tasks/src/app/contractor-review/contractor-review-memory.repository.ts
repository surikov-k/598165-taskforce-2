import * as crypto from 'crypto';
import { CRUDRepository } from '@task-force/core';
import { ContractorReviewEntity } from './contractor-review.entity';
import { Review } from '@task-force/shared-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractorReviewMemoryRepository implements CRUDRepository<ContractorReviewEntity, string, Review> {
  private repository: {[key: string]: Review} = {};

  public async create(item: ContractorReviewEntity): Promise<Review> {
    const entry = {...item.toObject(), id: crypto.randomUUID()};
    this.repository[entry.id] = entry;

    return {...entry};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async findById(id: string): Promise<Review | null> {
    if (this.repository[id]) {
      return {...this.repository[id]}
    }
    return null;
  }

  public async update(id: string, item: ContractorReviewEntity): Promise<Review> {
    this.repository[id] = {...item.toObject(), id};
    return this.findById(id);
  }
}
