import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AppUserRepository } from '../app-user/app-user.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class DoesEmailExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly appUserRepository: AppUserRepository) {}

  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    const user = await this.appUserRepository.findByEmail(email);
    return !user;
  }
}

export function DoesEmailExist(validationOptions?: ValidationOptions) {
  return function (object: Record<string, unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DoesEmailExistConstraint,
    });
  };
}
