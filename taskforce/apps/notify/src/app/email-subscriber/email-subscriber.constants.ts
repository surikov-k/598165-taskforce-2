export enum SubscriberError {
  EMAIL_NOT_VALID = 'The email is not valid',
  NAME_IS_EMPTY = 'The name is empty',
  USER_ID_IS_EMPTY = 'The userId is empty',
  EMAIL_EXISTS = 'The subscriber with the same email already exists',
}

export const RABBITMQ_SERVICE = 'RABBITMQ_SERVICE';
