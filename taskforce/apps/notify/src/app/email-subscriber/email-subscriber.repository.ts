import { CRUDRepository } from '@task-force/core';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { Subscriber } from '@task-force/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { EmailSubscriberModel } from './email-subscriber.model';
import { Model } from 'mongoose';

export class EmailSubscriberRepository
  implements CRUDRepository<EmailSubscriberEntity, string, Subscriber>
{
  constructor(
    @InjectModel(EmailSubscriberModel.name)
    private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) {}

  async create(item: EmailSubscriberEntity): Promise<Subscriber> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);
    return newEmailSubscriber.save();
  }

  async findById(id: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel.findOne({ id }).exec();
  }

  async findByEmail(email: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel.findOne({ email }).exec();
  }

  async destroy(id: string): Promise<void> {
    this.emailSubscriberModel.deleteOne({ id });
  }

  async update(id: string, item: EmailSubscriberEntity): Promise<Subscriber> {
    return this.emailSubscriberModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }
}
