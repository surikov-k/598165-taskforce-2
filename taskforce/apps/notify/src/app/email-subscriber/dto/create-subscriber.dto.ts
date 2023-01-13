import { SubscriberVerifyErrorMessage } from '../email-subscriber.constants';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @IsEmail(
    {},
    {
      message: SubscriberVerifyErrorMessage.EMAIL_NOT_VALID,
    }
  )
  public email: string;

  @IsString({
    message: SubscriberVerifyErrorMessage.NAME_IS_EMPTY,
  })
  public name: string;

  @IsNotEmpty({
    message: SubscriberVerifyErrorMessage.USER_ID_IS_EMPTY,
  })
  public userId: string;
}
