import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { calculateAge } from '@task-force/core';
import { CreateUserDto } from '../auth/dto';

export function IsOlderThan(
  property: number,
  validationOptions?: ValidationOptions
) {
  return function (object: CreateUserDto, propertyName: string) {
    registerDecorator({
      name: 'isOlderThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [allowedAge] = args.constraints;
          return calculateAge(value) >= allowedAge;
        },
      },
    });
  };
}
