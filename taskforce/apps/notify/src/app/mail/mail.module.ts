import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { getEmailConfig } from '../../../config';

@Module({
  imports: [MailerModule.forRootAsync(getEmailConfig())],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
