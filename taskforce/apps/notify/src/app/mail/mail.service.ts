import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@task-force/shared-types';
import { ADD_SUBSCRIBER_SUBJECT, MEW_TASKS_SUBJECT } from './mail.constants';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async notifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: ADD_SUBSCRIBER_SUBJECT,
      template: './confirmation',
      context: {
        name: subscriber.name,
        email: subscriber.email,
      },
    });
  }

  async sendNewTasks(subscriber: Subscriber, tasks) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: MEW_TASKS_SUBJECT,
      template: './new-tasks',
      context: {
        name: subscriber.name,
        email: subscriber.email,
        tasks,
      },
    });
  }
}
