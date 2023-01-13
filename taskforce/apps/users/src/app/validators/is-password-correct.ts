import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AppUserRepository } from '../app-user/app-user.repository';
import { ChangePasswordDto } from '../auth/dto';
import { AppUserEntity } from '../app-user/app-user.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsPasswordCorrectConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly appUserRepository: AppUserRepository) {}

  async validate(
    currentPassword: string,
    args: ValidationArguments
  ): Promise<boolean> {
    const { id } = args.object as ChangePasswordDto;
    const user = await this.appUserRepository.findById(id);

    if (!user) {
      return false;
    }

    const userEntity = await new AppUserEntity(user);

    return await userEntity.comparePassword(currentPassword);
  }
}

export function IsPasswordCorrect(validationOptions?: ValidationOptions) {
  return function (object: ChangePasswordDto, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordCorrectConstraint,
    });
  };
}
