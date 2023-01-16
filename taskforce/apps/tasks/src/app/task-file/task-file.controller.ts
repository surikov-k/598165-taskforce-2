import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@task-force/shared-types';
import { SaveTaskFileDto } from '../work-task/dto';
import { TaskFileService } from './task-file.service';

@Controller()
export class TaskFileController {
  constructor(private readonly taskFileService: TaskFileService) {}

  @EventPattern({ cmd: CommandEvent.SaveTaskFile })
  public async saveTaskFile(dto: SaveTaskFileDto) {
    await this.taskFileService.create(dto);
  }
}
