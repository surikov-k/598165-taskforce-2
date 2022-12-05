import {randomUUID} from 'crypto';
import { CRUDRepository } from '@task-force/core';
import { ContractorReviewEntity } from './contractor-review.entity';
import { Review } from '@task-force/shared-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractorReviewMemoryRepository implements CRUDRepository<ContractorReviewEntity, string, Review> {
  private repository = new Map<string, Review>()

  public async create(item: ContractorReviewEntity): Promise<Review> {
    const entry = { ...item.toObject(), id: randomUUID() };
    this.repository.set(entry.id, entry)

    return { ...entry };
  }

  public async destroy(id: string): Promise<void> {
    this.repository.delete(id)
  }

  public async findById(id: string): Promise<Review | null> {
    if (this.repository.get(id)) {
      return { ...this.repository.get(id) }
    }
    return null;
  }

  public async update(id: string, item: ContractorReviewEntity): Promise<Review> {
    this.repository.set(id, {...item.toObject(), id})
    return this.findById(id);
  }
}
