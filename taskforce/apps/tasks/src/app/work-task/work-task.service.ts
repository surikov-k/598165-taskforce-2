import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { WorkTaskEntity } from './work-task.entity';
import { CommandEvent, TaskStatus, UserRole } from '@task-force/shared-types';
import { RABBITMQ_SERVICE, TaskErrorMessages } from './work-taks.constants';
import { WorkTaskRepository } from './work-task.repository';
import { TaskSkillRepository } from '../task-skill/task-skill.repository';
import { TaskTagRepository } from '../task-tag/task-tag.repository';
import { TaskQuery } from './query';
import { TaskReplyRepository } from '../task-reply/task-reply.repository';
import { ClientProxy } from '@nestjs/microservices';
import { TaskFileRepository } from '../task-file/task-file.repository';
import { ContractorReviewRepository } from '../contractor-review/contractor-review.repository';
import { ContractorReviewEntity } from '../contractor-review/contractor-review.entity';
import { FinishTaskDto } from './dto/finish-task.dto';

@Injectable()
export class WorkTaskService {
  constructor(
    private readonly workTaskRepository: WorkTaskRepository,
    private readonly taskSkillRepository: TaskSkillRepository,
    private readonly taskTagRepository: TaskTagRepository,
    private readonly taskReplyRepository: TaskReplyRepository,
    private readonly taskFileRepository: TaskFileRepository,
    private readonly contractorReviewRepository: ContractorReviewRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  public async create(clientId: string, dto: CreateTaskDto) {
    const skills =
      dto.skills.length === 0
        ? []
        : await this.taskSkillRepository.find(dto.skills);

    const tags =
      dto.tags.length === 0
        ? []
        : await this.taskTagRepository.findByNameOrCreate(dto.tags);

    const taskEntity = new WorkTaskEntity({
      ...dto,
      clientId,
      dueDate: new Date(dto.dueDate),
      skills,
      tags,
      replies: [],
      files: [],
    });

    return this.workTaskRepository.create(taskEntity);
  }

  public async getOne(id: number) {
    return this.workTaskRepository.findById(id);
  }

  public async getAll(query: TaskQuery) {
    return this.workTaskRepository.find(query);
  }

  public async getNew(query: TaskQuery) {
    return this.workTaskRepository.findNew(query);
  }

  public async getMy(userId, userRole, query) {
    if (userRole === UserRole.Contractor) {
      return this.workTaskRepository.findContractorTasks(userId, query);
    }
    if (userRole === UserRole.Client) {
      return this.workTaskRepository.findClientTasks(userId, query);
    }
  }

  public async delete(taskId: number, userId: string) {
    const task = await this.workTaskRepository.findById(taskId);
    if (task.clientId !== userId) {
      throw new UnauthorizedException('Access denied. Not the task owner');
    }
    for (const reply of task.replies) {
      await this.taskReplyRepository.destroy(reply.id);
    }

    return this.workTaskRepository.destroy(taskId);
  }

  public async update(taskId, userId, dto: UpdateTaskDto) {
    const task = await this.workTaskRepository.findById(taskId);

    if (task.clientId !== userId) {
      throw new UnauthorizedException('Access denied. Not is the task owner');
    }
    let { skills, tags } = task;

    if (dto.skills) {
      skills =
        dto.skills.length === 0
          ? []
          : await this.taskSkillRepository.find(dto.skills);
    }

    if (dto.tags) {
      tags =
        dto.tags.length === 0
          ? []
          : await this.taskTagRepository.findByNameOrCreate(dto.tags);
    }

    const taskEntity = new WorkTaskEntity({
      ...task,
      ...dto,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : new Date(task.dueDate),
      skills,
      tags,
    });
    return this.workTaskRepository.update(taskId, taskEntity);
  }

  public async getNewTasks(date, email) {
    const tasks = await this.workTaskRepository.getNew(date);
    this.rabbitClient.emit({ cmd: CommandEvent.GetNewTasks }, { tasks, email });
  }

  async startTask(taskId: number, currentUserId: string, contractorId: string) {
    const task = await this.workTaskRepository.findById(taskId);
    const { clientId, status } = task;

    if (!task || clientId !== currentUserId || status !== TaskStatus.New) {
      throw new BadRequestException(TaskErrorMessages.ILLEGAL_ACTION);
    }

    const replies = await this.taskReplyRepository.findByTaskId(task.id);

    const contractorLeftReply = replies.find(
      (reply) => reply.userId === contractorId
    );

    if (!contractorLeftReply) {
      throw new BadRequestException(TaskErrorMessages.WRONG_CONTRACTOR);
    }

    const contractorHasOngoingTask =
      await this.workTaskRepository.findContractorTasks(contractorId, {
        status: TaskStatus.Ongoing,
      });

    if (contractorHasOngoingTask) {
      throw new BadRequestException(TaskErrorMessages.BUSY_CONTRACTOR);
    }

    const taskEntity = new WorkTaskEntity(task);

    taskEntity.changeStatus(TaskStatus.Ongoing);
    taskEntity.contractorId = contractorId;

    return this.workTaskRepository.update(taskId, taskEntity);
  }

  public async cancelTask(taskId: number, currentUserId: string) {
    const task = await this.workTaskRepository.findById(taskId);
    const { clientId, status } = task;

    if (!task || clientId !== currentUserId || status !== TaskStatus.New) {
      throw new BadRequestException(TaskErrorMessages.ILLEGAL_ACTION);
    }

    const taskEntity = new WorkTaskEntity(task);

    taskEntity.changeStatus(TaskStatus.Canceled);

    return this.workTaskRepository.update(taskId, taskEntity);
  }

  public async finishTask(
    taskId: number,
    currentUserId: string,
    dto: FinishTaskDto
  ) {
    const task = await this.workTaskRepository.findById(taskId);
    const { clientId, status, contractorId, id } = task;

    if (!task || clientId !== currentUserId || status !== TaskStatus.Ongoing) {
      throw new BadRequestException(TaskErrorMessages.ILLEGAL_ACTION);
    }

    const taskEntity = new WorkTaskEntity(task);
    taskEntity.changeStatus(TaskStatus.Done);

    const newReviewEntity = new ContractorReviewEntity({
      ...dto,
      contractorId,
      taskId: id,
    });
    await this.contractorReviewRepository.create(newReviewEntity);

    const updatedTask = await this.workTaskRepository.update(
      taskId,
      taskEntity
    );

    await this.updateContractorRating(contractorId);

    return updatedTask;
  }

  public async failTask(taskId, currentUserId: string) {
    const task = await this.workTaskRepository.findById(taskId);
    const { status, contractorId } = task;

    if (
      !task ||
      contractorId !== currentUserId ||
      status !== TaskStatus.Ongoing
    ) {
      throw new BadRequestException(TaskErrorMessages.ILLEGAL_ACTION);
    }

    const taskEntity = new WorkTaskEntity(task);
    taskEntity.changeStatus(TaskStatus.Failed);

    const updatedTask = await this.workTaskRepository.update(
      taskId,
      taskEntity
    );

    await this.updateContractorRating(contractorId);

    return updatedTask;
  }

  private async updateContractorRating(contractorId: string) {
    const totalRating = await this.contractorReviewRepository.getTotalRating(
      contractorId
    );

    const totalTasks = await this.workTaskRepository.countFinishingTask(
      contractorId
    );

    const newContractorRating = totalRating / totalTasks;

    this.rabbitClient.emit(
      { cmd: CommandEvent.UpdateUserRating },
      { contractorId, newContractorRating }
    );
  }
}
