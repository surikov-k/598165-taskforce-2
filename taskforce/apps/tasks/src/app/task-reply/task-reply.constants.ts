export const MIN_REPLY_LENGTH = 10;
export const MAX_REPLY_LENGTH = 300;

export enum CreateReplyError {
  REPLY_TOO_SHORT = 'Reply text is too short',
  REPLY_TOO_LONG = 'Reply text is too long',
  TASK_DOESNT_EXIST = 'Task doesnt exist'
}
