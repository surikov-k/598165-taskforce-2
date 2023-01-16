import { Inject, Injectable } from '@nestjs/common';
import { UploadRepository } from './upload.repository';
import { SaveAvatarDto, SaveTaskFileDto, SaveUploadDto } from './dto';
import { UploadEntity } from './upload.entity';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent } from '@task-force/shared-types';
import { RABBITMQ_SERVICE } from './upload.constants';

@Injectable()
export class UploadService {
  constructor(
    private readonly uploadRepository: UploadRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  public async saveTaskFile(dto: SaveTaskFileDto) {
    const { taskId, userId, filename } = dto;
    this.rabbitClient.emit(
      { cmd: CommandEvent.SaveTaskFile },
      {
        userId,
        taskId,
        filename,
      }
    );
    return this.save({ filename });
  }

  public async saveAvatarFile(dto: SaveAvatarDto) {
    const { userId, filename } = dto;
    this.rabbitClient.emit(
      { cmd: CommandEvent.SaveAvatar },
      {
        userId,
        filename,
      }
    );
    return this.save({ filename });
  }

  private async save(upload: SaveUploadDto) {
    return this.uploadRepository.create(new UploadEntity(upload));
  }
}
