import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AppUserRepository } from '../app-user/app-user.repository';
import { CreateUserDto } from '../auth/dto';

@ValidatorConstraint({ async: true })
@Injectable()
export class DoesEmailExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly appUserRepository: AppUserRepository) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.appUserRepository.findByEmail(email);
    return !user;
  }
}

export function DoesEmailExist(validationOptions?: ValidationOptions) {
  return function (object: CreateUserDto, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DoesEmailExistConstraint,
    });
  };
}
