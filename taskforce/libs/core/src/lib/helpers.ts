import { ClassConstructor, plainToInstance } from 'class-transformer';

export const fillObject = <T, V>(dto: ClassConstructor<T>, object: V) => plainToInstance(dto, object, { excludeExtraneousValues: true });
