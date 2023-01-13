import { ClassConstructor, plainToInstance } from 'class-transformer';
import * as dayjs from 'dayjs';
import { CommandEvent } from '@task-force/shared-types';

export const fillObject = <T, V>(dto: ClassConstructor<T>, object: V) =>
  plainToInstance(dto, object, { excludeExtraneousValues: true });

export const getMongoConnectionString = ({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}): string => {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
};

export const calculateAge = (date: string) => {
  const now = dayjs();
  const dob = dayjs(date);
  return now.diff(dob, 'year');
};

export function createEvent(commandEvent: CommandEvent) {
  return { cmd: commandEvent };
}
