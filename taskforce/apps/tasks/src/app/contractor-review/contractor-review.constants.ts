export enum ContractorRating {
  MIN = 1,
  MAX = 5,
}

export enum ReviewText {
  MIN = 50,
  MAX = 500,
}

export enum CreateReviewError {
  RATING_TOO_LOW = 'Rating is too low',
  RATING_TOO_HIGH = 'Rating is too high',
  TEXT_TOO_SHORT = 'Review text is too short',
  TEXT_TOO_LONG = 'Review text is too long',
  TASK_DOESNT_EXIST = 'Task doesnt exist',
}
