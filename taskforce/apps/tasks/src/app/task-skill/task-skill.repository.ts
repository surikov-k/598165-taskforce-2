import { CRUDRepository } from '@task-force/core';
import { TaskSkillEntity } from './task-skill.entity';
import { Skill } from '@task-force/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskSkillRepository implements CRUDRepository<TaskSkillEntity, number, Skill> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskSkillEntity): Promise<Skill> {
    return this.prisma.skill.create({
      data: {...item.toObject()} // TODO ?
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.skill.delete({
      where: {id}
    });
  }

  public async findById(id: number): Promise<Skill | null> {
    return this.prisma.skill.findFirst({
      where: {id}
    });
  }

  public async find(ids: number[] = []): Promise<Skill[]> {
    return this.prisma.skill.findMany({
      where: {
        id: { in: ids.length > 0 ? ids : undefined}
      }
    });
  }

  public async update(id: number, item: TaskSkillEntity): Promise<Skill> {
    return this.prisma.skill.update({
      where: {id},
      data: { ...item.toObject(), id}
    });
  }

}
