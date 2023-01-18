export enum ReplyText {
  MIN = 10,
  MAX = 300,
}

export enum CreateReplyError {
  REPLY_TOO_SHORT = 'Reply text is too short',
  REPLY_TOO_LONG = 'Reply text is too long',
  TASK_DOESNT_EXIST = 'Task doesnt exist',
}
