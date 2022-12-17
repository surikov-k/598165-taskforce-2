import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
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
    description: 'Reply found'
  })
  public async show(@Param('id') id: string ){
    const replyId = parseInt(id, 10);
    const reply = await this.replyService.getOne(replyId);
    return fillObject(ReplyRdo, reply)
  }

  @Get('/')
  @ApiResponse({
    type: [ReplyRdo],
    status: HttpStatus.OK,
    description: 'List of replies found'
  })
  public async index(){
    const replies = await this.replyService.getAll();
    return fillObject(ReplyRdo, replies)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Reply was deleted'
  })
  public async delete(@Param('id') id: string){
    const replyId = parseInt(id, 10);
    return this.replyService.delete(replyId);
  }
}
