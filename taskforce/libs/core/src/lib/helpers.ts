import { ClassConstructor, plainToInstance } from 'class-transformer';

export const fillObject = <T, V>(dto: ClassConstructor<T>, object: V) => plainToInstance(dto, object, { excludeExtraneousValues: true });

export const getMongoConnectionString = ({username, password, host, port, databaseName, authDatabase}): string => {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`
}
