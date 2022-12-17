import { Injectable } from '@nestjs/common';
import { TaskTagRepository } from './task-tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from '@task-force/shared-types';
import { TaskTagEntity } from './task-tag.entity';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TaskTagService {
  constructor(private readonly taskTagRepository: TaskTagRepository) {}

  public async create(dto: CreateTagDto): Promise<Tag> {
    const tagEntity = new TaskTagEntity(dto);
    return this.taskTagRepository.create(tagEntity);
  }

  public async delete(id: number): Promise<void> {
    await this.taskTagRepository.destroy(id);
  }

  public async getOne(id: number): Promise<Tag> {
    return this.taskTagRepository.findById(id);
  }

  public async getAll(): Promise<Tag[]> {
    return this.taskTagRepository.find();
  }

  public async update(id: number, dto: UpdateTagDto): Promise<Tag> {
    return this.taskTagRepository.update(id, new TaskTagEntity(dto));
  }
}
