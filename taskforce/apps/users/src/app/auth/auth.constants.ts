export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 12;
export const MIN_AGE = 18;
export const TELEGRAM_NAME_LENGTH = 5;
export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 50;
export const MAX_ABOUT_LENGTH = 300;
export const MAX_SKILLS_NUMBER = 5;

export const RABBITMQ_SERVICE = 'RABBITMQ_SERVICE';

export enum UserErrorMessage {
  EMAIL_EXISTS = 'User with this email already exists',
  NOT_FOUND = 'User not found',
  WRONG_PASSWORD = 'User password is incorrect',
  ROLE_NOT_VALID = 'User role is incorrect',
  EMAIL_NOT_VALID = 'Email is not valid',
  BIRTH_DATE_NOT_VALID = "User's date of birth is not valid",
  CITY_NOT_VALID = 'Wrong city',
  AVATAR_WRONG_TYPE = "The user's avatar must be in jpeg or png format",
  PASSWORD_TOO_SHORT = "The user's password is too short",
  PASSWORD_TOO_LONG = "The user's password is too long",
  NAME_TOO_SHORT = "The user's name is too short",
  NAME_TOO_LONG = "The user's name is too long",
  ABOUT_TOO_LONG = 'Information about the user is too long',
  AGE_NOT_VALID = 'User is too young',
  TELEGRAM_NOT_VALID = 'Telegram username is too short or contains invalid characters',
  MONGOID_NOT_VALID = 'Bad user ID',
  TOO_MANY_SKILLS = 'Too many skills',
}
