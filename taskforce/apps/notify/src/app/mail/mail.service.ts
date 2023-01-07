import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendAll(users) {
    users.map(async (user) => {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Welcome to Taskforce',
        template: './confirmation',
        context: {
          name: user.name,
        },
      });
    });
  }
}
