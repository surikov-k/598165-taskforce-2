import { Injectable } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { TaskReplyEntity } from './task-reply.entity';
import { TaskReplyRepository } from './task-reply.repository';
import { Reply } from '@task-force/shared-types';

@Injectable()
export class TaskReplyService {
  constructor(
    private readonly taskReplyRepository: TaskReplyRepository
  ) {}

  public async create(dto: CreateReplyDto) {
    const replyEntity =  new TaskReplyEntity(dto);
    return this.taskReplyRepository.create(replyEntity);
  }

  public async getOne(id: number) {
    return this.taskReplyRepository.findById(id);
  }

  public async getAll(): Promise<Reply[]> {
    return this.taskReplyRepository.find();
  }

  public async delete(id: number) {
    await this.taskReplyRepository.destroy(id);
  }
}
