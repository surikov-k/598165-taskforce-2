import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskSkillService } from './task-skill.service';
import { fillObject } from '@task-force/core';
import { SkillRdo } from './rdo/skill.rdo';
import { CreateSkillDto } from './dto/create-skill.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('skill')
@Controller('skills')
export class TaskSkillController {
  constructor(private readonly taskSkillService: TaskSkillService) {}

  @Get('/:id')
  @ApiResponse({
    type: SkillRdo,
    status: HttpStatus.OK,
    description: 'Skill found'
  })
  public async show(@Param('id') id: number) {
    const skill = await this.taskSkillService.getSkill(id);
    return fillObject(SkillRdo, skill);
  }

  @Get('/')
  @ApiResponse({
    type: [SkillRdo],
    status: HttpStatus.OK,
    description: 'List of skills found'
  })
  public async index(@Query('list') query: string) {
    const skillIds =  query ? query.split(',').map((it) => +it) : []
    const skills = await this.taskSkillService.getSkills(skillIds);
    return fillObject(SkillRdo, skills);
  }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New skill successfully created'
  })
  public async create(@Body() dto: CreateSkillDto){
    const skill = await this.taskSkillService.createSkill(dto);
    return fillObject(SkillRdo, skill)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Skill deleted'
  })
  public async destroy(@Param('id') id: number) {
    await this.taskSkillService.deleteSkill(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: SkillRdo,
    status: HttpStatus.OK,
    description: 'Skill updated'
  })
  public async update(@Param('id') id: number, @Body() dto: CreateSkillDto){
    const skill = await this.taskSkillService.updateSkill(id, dto);
    return fillObject(SkillRdo, skill);
  }
}
