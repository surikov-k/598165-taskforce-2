export const ENV_FILE_PATH = 'environments/.user.env';

export const MIN_PORT = 0;
export const MAX_PORT = 65535;

export enum EnvValidationMessage {
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'DB name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
}
