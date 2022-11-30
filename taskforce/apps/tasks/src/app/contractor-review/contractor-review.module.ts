import { Module } from '@nestjs/common';
import { ContractorReviewMemoryRepository } from './contractor-review-memory.repository';
import { ContractorReviewController } from './contractor-review.controller';
import { ContractorReviewService } from './contractor-review.service';
import { WorkTaskMemoryRepository } from '../work-task/work-task-memory.repository';


@Module({
  controllers: [ContractorReviewController],
  providers: [
    ContractorReviewService,
    ContractorReviewMemoryRepository,
    WorkTaskMemoryRepository
  ],
  exports: [ContractorReviewMemoryRepository],
})
export class ContractorReviewModule {
}
