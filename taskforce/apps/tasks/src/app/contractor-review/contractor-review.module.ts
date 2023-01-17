import { Module } from '@nestjs/common';
import { ContractorReviewController } from './contractor-review.controller';
import { ContractorReviewService } from './contractor-review.service';
import { ContractorReviewRepository } from './contractor-review.repository';

@Module({
  imports: [],
  controllers: [ContractorReviewController],
  providers: [ContractorReviewService, ContractorReviewRepository],
  exports: [ContractorReviewRepository],
})
export class ContractorReviewModule {}
