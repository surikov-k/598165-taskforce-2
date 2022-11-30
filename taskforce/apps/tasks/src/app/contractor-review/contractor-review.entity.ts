import { Review } from '@task-force/shared-types';

export class ContractorReviewEntity implements Review {
  id: string;
  rating: number;
  taskId: string;
  text: string;
  userId: string;

  constructor(contractorReview: Review) {
    this.fillEntity(contractorReview);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(contractorReview: Review) {
    this.id = contractorReview.id;
    this.rating = contractorReview.rating;
    this.taskId = contractorReview.taskId;
    this.text = contractorReview.text;
    this.userId = contractorReview.userId;
  }

}
