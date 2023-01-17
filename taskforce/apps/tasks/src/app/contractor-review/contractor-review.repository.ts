import { CRUDRepository } from '@task-force/core';
import { ContractorReviewEntity } from './contractor-review.entity';
import { Review } from '@task-force/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractorReviewRepository
  implements CRUDRepository<ContractorReviewEntity, number, Review>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: ContractorReviewEntity): Promise<Review> {
    return this.prisma.review.create({ data: { ...item.toObject() } });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.review.delete({ where: { id } });
  }

  public async findById(id: number): Promise<Review | null> {
    return this.prisma.review.findFirst({
      where: { id },
    });
  }

  public async find(ids: number[] = []): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: {
        id: { in: ids.length > 0 ? ids : undefined },
      },
    });
  }

  public async update(
    id: number,
    item: ContractorReviewEntity
  ): Promise<Review> {
    return this.prisma.review.update({
      where: { id },
      data: { ...item.toObject(), id },
    });
  }

  public async getTotalRating(contractorId: string) {
    const aggregate = await this.prisma.review.aggregate({
      where: { contractorId },
      _sum: { rating: true },
    });
    return aggregate._sum.rating;
  }
}
