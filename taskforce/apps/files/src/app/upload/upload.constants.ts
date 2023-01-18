export const UploadVerifyErrorMessage = {
  FILENAME_IS_EMPTY: 'Filename is empty',
  FILENAME_EXISTS: 'File with the same name already exists',
  MONGOID_NOT_VALID: 'Mongo Id is not valid',
};

export const UploadFile = {
  DIRECTORY: './uploads',
  ALLOWED_TYPE: '.(png|jpg|jpeg)',
  MAX_SIZE: 1024 * 1024,
};

export const RABBITMQ_SERVICE = 'RABBITMQ_SERVICE';

export enum UploadError {
  WRONG_USER = 'Wrong User',
}
