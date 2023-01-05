import { Module } from '@nestjs/common';
import { ContractorReviewController } from './contractor-review.controller';
import { ContractorReviewService } from './contractor-review.service';
import { ContractorReviewRepository } from './contractor-review.repository';
import { DoesTaskExistConstraint } from '../validators';
import { WorkTaskModule } from '../work-task/work-task.module';


@Module({
  imports: [WorkTaskModule],
  controllers: [ContractorReviewController],
  providers: [
    ContractorReviewService,
    ContractorReviewRepository,
    DoesTaskExistConstraint
  ],
  exports: [ContractorReviewRepository],
})
export class ContractorReviewModule {
}
