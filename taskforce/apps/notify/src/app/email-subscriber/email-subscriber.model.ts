import { Subscriber } from '@task-force/shared-types';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'email-subscriber',
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop()
  public email: string;

  @Prop()
  public name: string;

  @Prop()
  public userId: string;

  @Prop()
  public lastMail: Date;
}

export const EmailSubscriberSchema =
  SchemaFactory.createForClass(EmailSubscriberModel);
