import { Injectable } from '@nestjs/common';
import { ContractorReviewMemoryRepository } from './contractor-review-memory.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { WorkTaskMemoryRepository } from '../work-task/work-task-memory.repository';
import { ContractorReviewEntity } from './contractor-review.entity';

@Injectable()
export class ContractorReviewService {
  constructor(
    private readonly contractorReviewRepository: ContractorReviewMemoryRepository,
    private readonly workTaskRepository: WorkTaskMemoryRepository
  ) {}

  public async create(dto: CreateReviewDto) {
    const {rating, taskId, text} = dto;
    const task = await this.workTaskRepository.findById(taskId);

    const review = {
      userId: task?.contractorId,
      taskId,
      text,
      rating,
    };

    const reviewEntity = new ContractorReviewEntity(review);

    return this.contractorReviewRepository.create(reviewEntity);
  }

  public async getOne(id: string) {
   return this.contractorReviewRepository.findById(id);
  }

  public async delete(id: string) {
    return this.contractorReviewRepository.destroy(id);
  }
}
