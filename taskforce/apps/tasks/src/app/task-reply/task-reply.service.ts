import { Injectable } from '@nestjs/common';
import { TaskReplyMemoryRepository } from './task-reply-memory.repository';
import { CreateReplyDto } from './dto/create-reply.dto';
import { TaskReplyEntity } from './task-reply.entity';

@Injectable()
export class TaskReplyService {
  constructor(
    private readonly taskReplyRepository: TaskReplyMemoryRepository
  ) {}

  public async create(dto: CreateReplyDto) {
    const replyEntity =  new TaskReplyEntity(dto);
    return this.taskReplyRepository.create(replyEntity);
  }

  public async getOne(id: string) {
    return this.taskReplyRepository.findById(id);
  }

  public async delete(id: string) {
    return this.taskReplyRepository.destroy(id);
  }
}
