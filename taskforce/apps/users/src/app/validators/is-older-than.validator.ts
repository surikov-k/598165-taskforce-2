import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { calculateAge } from '@task-force/core';

export function IsOlderThan(
  property: number,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, unknown>, propertyName: string) {
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
