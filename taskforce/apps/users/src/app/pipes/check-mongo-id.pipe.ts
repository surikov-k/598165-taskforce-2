import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserErrorMessage } from '../auth/auth.constants';

export class CheckMongoId implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe must be used only with params!');
    }
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(UserErrorMessage.MONGOID_NOT_VALID)
    }
    return value;
  }
}
