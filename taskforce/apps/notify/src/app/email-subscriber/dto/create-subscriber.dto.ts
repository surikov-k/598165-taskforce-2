import { SubscriberError } from '../email-subscriber.constants';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @IsEmail(
    {},
    {
      message: SubscriberError.EMAIL_NOT_VALID,
    }
  )
  public email: string;

  @IsString({
    message: SubscriberError.NAME_IS_EMPTY,
  })
  public name: string;

  @IsNotEmpty({
    message: SubscriberError.USER_ID_IS_EMPTY,
  })
  public userId: string;
}
