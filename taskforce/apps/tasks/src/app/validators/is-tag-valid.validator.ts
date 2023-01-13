import { registerDecorator, ValidationOptions } from 'class-validator';
import { TAG_PATTERN } from '../work-task/work-taks.constants';

export function IsTagValid(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsTagValid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          const tagRegexp = new RegExp(TAG_PATTERN);
          return tagRegexp.test(value);
        },
      },
    });
  };
}
