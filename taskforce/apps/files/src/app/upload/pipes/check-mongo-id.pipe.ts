import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UploadVerifyErrorMessage } from '../upload.constants';

export class CheckMongoId implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe must be used only with params!');
    }
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(UploadVerifyErrorMessage.MONGOID_NOT_VALID);
    }
    return value;
  }
}
