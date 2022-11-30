import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { TaskReplyService } from './task-reply.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { fillObject } from '@task-force/core';
import { ReplyRdo } from './rdo/reply.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('reply')
@Controller('reply')
export class TaskReplyController {
  constructor(
    private readonly replyService: TaskReplyService
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new task reply is created'
  })
  public async create(@Body() dto: CreateReplyDto){
    const reply = await this.replyService.create(dto);
    return fillObject(ReplyRdo, reply)
  }

  @Get(':id')
  @ApiResponse({
    type: ReplyRdo,
    status: HttpStatus.OK,
    description: 'The task reply is found'
  })
  public async show(@Param('id') id: string ){
    return this.replyService.getOne(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task reply was deleted'
  })
  public async delete(@Param('id') id: string){
    return this.replyService.delete(id);
  }
}
