import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Get('all')
  async sendAll() {
    const users = [
      {
        email: 'cleo.davidson@example.com',
        name: 'Arlinda Jaskolski I',
      },
      {
        email: 'norma.leonard@example.com',
        name: 'Mr. Loraine Bahringer',
      },
    ];
    try {
      await this.mailService.sendAll(users);
    } catch (e) {
      console.log(e);
    }
  }
}
