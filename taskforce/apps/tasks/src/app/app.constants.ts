export const ENV_FILE_PATH = 'environments/.tasks.env';

export enum TaskDefault {
  COUNT_LIMIT = 25,
  SORT_DIRECTION = 'desc',
}

export enum EnvValidationMessage {
  RMQHostRequired = 'RabbitMQ host is required',
  RMQUserRequired = 'RabbitMQ user is required',
  RMQPasswordRequired = 'RabbitMQ password is required',
  RMQSubscriberQueue = 'RabbitMQ Subscribers Queue is required',
}
