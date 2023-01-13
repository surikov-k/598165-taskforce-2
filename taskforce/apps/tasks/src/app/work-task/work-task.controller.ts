import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { WorkTaskService } from './work-task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { fillObject } from '@task-force/core';
import { TaskRdo } from './rdo/task.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskQuery } from './query/task.query';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@task-force/shared-types';

@ApiTags('task')
@Controller('task')
export class WorkTaskController {
  constructor(private readonly workTaskService: WorkTaskService) {}

  @EventPattern({ cmd: CommandEvent.QueueNewTasks })
  public async getNewTask({ date, email }) {
    await this.workTaskService.getNewTasks(date, email);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new task has been successfully created',
  })
  public async create(@Body() dto: CreateTaskDto) {
    const task = await this.workTaskService.create(dto);
    return fillObject(TaskRdo, task);
  }

  @Get()
  @ApiResponse({
    type: [TaskRdo],
    status: HttpStatus.OK,
    description: 'The list of tasks is found',
  })
  public async index(@Query() query: TaskQuery) {
    const tasks = await this.workTaskService.getAll(query);
    return tasks.map((task) => fillObject(TaskRdo, task));
  }

  @Get(':id')
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The task is found',
  })
  public async show(@Param('id') id: number) {
    const task = await this.workTaskService.getOne(id);
    return fillObject(TaskRdo, task);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task was deleted',
  })
  public async delete(@Param('id') id: number) {
    await this.workTaskService.delete(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: TaskRdo,
    description: 'Update task',
  })
  public async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const task = await this.workTaskService.update(id, dto);
    return fillObject(TaskRdo, task);
  }
}
