import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Request } from 'express';

import { CommandEvent } from '@task-force/shared-types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { AccessTokenGuard } from './guards/access-token.guard';

@Controller('mail')
export class EmailSubscriberController {
  constructor(private readonly subscriberService: EmailSubscriberService) {}

  @UseGuards(AccessTokenGuard)
  @Get('new')
  public async queueNewTasks(@Req() req: Request) {
    const email = req.user['email'];
    await this.subscriberService.queueNewTasks(email);
  }

  @EventPattern({ cmd: CommandEvent.AddSubscriber })
  public async create(subscriber: CreateSubscriberDto) {
    return this.subscriberService.create(subscriber);
  }

  @EventPattern({ cmd: CommandEvent.GetNewTasks })
  public async updateLast({ email, tasks }) {
    return this.subscriberService.updateLastMail(email, tasks);
  }
}
