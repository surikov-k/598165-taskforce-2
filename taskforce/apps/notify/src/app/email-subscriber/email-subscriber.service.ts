import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import {
  RABBITMQ_SERVICE,
  SubscriberVerifyErrorMessage,
} from './email-subscriber.constants';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { MailService } from '../mail/mail.service';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent } from '@task-force/shared-types';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  async create(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const foundSubscriber = await this.emailSubscriberRepository.findByEmail(
      email
    );

    if (foundSubscriber) {
      throw new Error(SubscriberVerifyErrorMessage.EMAIL_EXISTS);
    }

    const newSubscriber = {
      ...subscriber,
      lastMail: new Date(),
    };

    await this.mailService.notifyNewSubscriber(newSubscriber);

    return this.emailSubscriberRepository.create(
      new EmailSubscriberEntity(newSubscriber)
    );
  }

  async findByEmail(email: string) {
    return this.emailSubscriberRepository.findByEmail(email);
  }

  async queueNewTasks(email: string) {
    const subscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (!subscriber) {
      throw new UnauthorizedException('Access denied');
    }

    this.rabbitClient.emit(
      {
        cmd: CommandEvent.QueueNewTasks,
      },
      {
        email: subscriber.email,
        date: subscriber.lastMail,
      }
    );
  }

  async updateLastMail(email, tasks) {
    const subscriber = await this.emailSubscriberRepository.findByEmail(email);
    await this.mailService.sendNewTasks(subscriber, tasks);
    const subscriberEntity = new EmailSubscriberEntity({
      ...subscriber,
      lastMail: new Date(),
    });
    return this.emailSubscriberRepository.update(
      subscriber.id,
      subscriberEntity
    );
  }
}
