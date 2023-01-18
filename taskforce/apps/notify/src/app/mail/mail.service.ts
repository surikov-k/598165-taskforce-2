import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@task-force/shared-types';
import { MailSubject } from './mail.constants';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async notifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: MailSubject.ADD_SUBSCRIBER,
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
      subject: MailSubject.NEW_TASKS,
      template: './new-tasks',
      context: {
        name: subscriber.name,
        email: subscriber.email,
        tasks,
      },
    });
  }
}
