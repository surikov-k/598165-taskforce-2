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
  UseGuards,
} from '@nestjs/common';
import { WorkTaskService } from './work-task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { fillObject } from '@task-force/core';
import { TaskRdo } from './rdo/task.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MyTasksQuery, StartTaskQuery, TaskQuery } from './query';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent, UserRole } from '@task-force/shared-types';
import {
  AccessTokenGuard,
  ClientGuard,
  ContractorGuard,
} from '../common/guards';
import { GetCurrentUserId, GetCurrentUserRole } from '../common/decorators';
import { FinishTaskDto } from './dto/finish-task.dto';

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
  @UseGuards(ClientGuard)
  public async create(
    @Body() dto: CreateTaskDto,
    @GetCurrentUserId() clientId: string
  ) {
    const task = await this.workTaskService.create(clientId, dto);
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

  @Get('new')
  @UseGuards(ContractorGuard)
  @ApiResponse({
    type: [TaskRdo],
    status: HttpStatus.OK,
    description: 'The list of new tasks',
  })
  public async indexNew(@Query() query: TaskQuery) {
    const tasks = await this.workTaskService.getNew(query);
    return tasks.map((task) => fillObject(TaskRdo, task));
  }

  @Get('my')
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    type: [TaskRdo],
    status: HttpStatus.OK,
    description: 'The list of the user tasks',
  })
  public async indexMy(
    @GetCurrentUserId() userId: string,
    @GetCurrentUserRole() userRole: UserRole,
    @Query() query: MyTasksQuery
  ) {
    const tasks = await this.workTaskService.getMy(userId, userRole, query);
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
  @UseGuards(ClientGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task was deleted',
  })
  public async delete(
    @Param('id') taskId: number,
    @GetCurrentUserId() userId: string
  ) {
    return this.workTaskService.delete(taskId, userId);
  }

  @Patch('/:id')
  @UseGuards(ClientGuard)
  @ApiResponse({
    type: TaskRdo,
    description: 'Update task',
  })
  public async update(
    @Param('id') id: number,
    @GetCurrentUserId() userId: string,
    @Body() dto: UpdateTaskDto
  ) {
    const task = await this.workTaskService.update(id, userId, dto);
    return fillObject(TaskRdo, task);
  }

  @Patch('/:id/accept')
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    type: TaskRdo,
    description: 'Start a task',
  })
  public async startTask(
    @Param('id') taskId: number,
    @GetCurrentUserRole() userRole: string,
    @GetCurrentUserId() currentUserId: string,
    @Query() query: StartTaskQuery
  ) {
    const { contractorId } = query;

    const updatedTask = await this.workTaskService.startTask(
      taskId,
      currentUserId,
      contractorId
    );

    return fillObject(TaskRdo, updatedTask);
  }

  @Patch('/:id/cancel')
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    type: TaskRdo,
    description: 'Cancel a task',
  })
  public async cancelTask(
    @Param('id') taskId: number,
    @GetCurrentUserId() currentUserId: string
  ) {
    const updatedTask = await this.workTaskService.cancelTask(
      taskId,
      currentUserId
    );

    return fillObject(TaskRdo, updatedTask);
  }

  @Patch('/:id/done')
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    type: TaskRdo,
    description: 'Finish a task',
  })
  public async finishTask(
    @Param('id') taskId: number,
    @GetCurrentUserId() currentUserId: string,
    @Body() dto: FinishTaskDto
  ) {
    const updatedTask = await this.workTaskService.finishTask(
      taskId,
      currentUserId,
      dto
    );

    return fillObject(TaskRdo, updatedTask);
  }

  @Patch('/:id/fail')
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    type: TaskRdo,
    description: 'Fail a task',
  })
  public async failTask(
    @Param('id') taskId: number,
    @GetCurrentUserId() currentUserId: string
  ) {
    const updatedTask = await this.workTaskService.failTask(
      taskId,
      currentUserId
    );

    return fillObject(TaskRdo, updatedTask);
  }
}
