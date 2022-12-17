export const TaskStatus: {
  New: 'New',
  Canceled: 'Canceled',
  Ongoing: 'Ongoing',
  Done: 'Done',
  Failed: 'Failed',
} = {
  New: 'New',
  Canceled: 'Canceled',
  Ongoing: 'Ongoing',
  Done: 'Done',
  Failed: 'Failed',
}

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];
