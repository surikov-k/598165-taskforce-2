export const TASK_DOESNT_EXISTS = "The task with this ID doesn't exist";

export const MIN_TITLE_LENGTH = 20;
export const MAX_TITLE_LENGTH = 50;

export const MIN_DESCRIPTION_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 1024;

export const MIN_ADDRESS_LENGTH = 10;
export const MAX_ADDRESS_LENGTH = 255;

export const MAX_TAGS_NUMBER = 5;

export const TAG_PATTERN = /^[a-z]\S{2,9}/i;

export enum TaskSorting {
  Date = 'created',
  Popular = 'replies',
  Discussed = 'comments',
}

export enum TaskErrorMessages {
  TITLE_TOO_SHORT = "The task's title is too short",
  TITLE_TOO_LONG = "The task's title is too long",
  DESCRIPTION_TOO_SHORT = 'Information about the task is too short',
  DESCRIPTION_TOO_LONG = 'Information about the task is too long',
  ADDRESS_TOO_SHORT = 'Address is too short',
  ADDRESS_TOO_LONG = 'Address is too long',
  BUDGET_INCORRECT = 'The budget value has to be a positive number',
  DUE_DATE_INCORRECT = 'Due date cannot be less than the current date',
  WRONG_IMAGE_FORMAT = 'Image has to be in jpeg or png format',
  TOO_MANY_TAGS = 'Too many tags',
  SKILL_EXISTS = 'Some skill doesnt exist',
  TAG_INVALID = 'Some tag is not valid',
}

export const RABBITMQ_SERVICE = 'RABBITMQ_SERVICE';
