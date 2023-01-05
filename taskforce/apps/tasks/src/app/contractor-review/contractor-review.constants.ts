export const MIN_CONTRACTOR_RATING = 1;
export const MAX_CONTRACTOR_RATING = 5;

export const MIN_REVIEW_TEXT = 50;
export const MAX_REVIEW_TEXT = 500;

export enum CreateReviewError {
  RATING_TOO_LOW = 'Rating is too low',
  RATING_TOO_HIGH = 'Rating is too high',
  TEXT_TOO_SHORT = 'Review text is too short',
  TEXT_TOO_LONG = 'Review text is too long',
  TASK_DOESNT_EXIST = 'Task doesnt exist'
}
