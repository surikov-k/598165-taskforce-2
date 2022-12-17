import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ContractorReviewEntity } from './contractor-review.entity';
import { ContractorReviewRepository } from './contractor-review.repository';
import { Review } from '@task-force/shared-types';

@Injectable()
export class ContractorReviewService {
  constructor(private readonly contractorReviewRepository: ContractorReviewRepository) {}

  public async create(dto: CreateReviewDto) {
    const entity = new ContractorReviewEntity(dto)
    return this.contractorReviewRepository.create(entity);
  }

  public async delete(id: number): Promise<void> {
    await this.contractorReviewRepository.destroy(id);
  }

  public async getOne(id: number) {
    return this.contractorReviewRepository.findById(id);
  }

  public async getAll(): Promise<Review[]> {
    return this.contractorReviewRepository.find();
  }
}
