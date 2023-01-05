import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { WorkTaskService } from './work-task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { fillObject } from '@task-force/core';
import { TaskRdo } from './rdo/task.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskQuery } from './query/task.query';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('task')
@Controller('task')
export class WorkTaskController {
  constructor(
    private readonly workTaskService: WorkTaskService
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new task has been successfully created'
  })
  public async create(@Body() dto: CreateTaskDto) {
    const task = await this.workTaskService.create(dto)
    return fillObject(TaskRdo, task);
  }

  @Get()
  @ApiResponse({
    type: [TaskRdo],
    status: HttpStatus.OK,
    description: 'The list of tasks is found'
  })
  public async index(@Query() query: TaskQuery) {
    const tasks = await this.workTaskService.getAll(query);
    return tasks.map((task) => fillObject(TaskRdo, task));
  }

  @Get(':id')
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The task is found'
  })
  public async show(@Param('id') id: number) {
    const task = await this.workTaskService.getOne(id);
    return fillObject(TaskRdo, task)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task was deleted'
  })
  public async delete(@Param('id') id: number) {
    await this.workTaskService.delete(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: TaskRdo,
    description: 'Update task'
  })
  public async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const task = await this.workTaskService.update(id, dto)
    return fillObject(TaskRdo, task);
  }
}
