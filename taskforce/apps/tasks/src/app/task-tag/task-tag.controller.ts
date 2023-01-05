import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { TaskTagService } from './task-tag.service';
import { fillObject } from '@task-force/core';
import { TagRdo } from './rdo/tag.rdo';
import { ApiResponse } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TaskTagController {
  constructor(private readonly taskTagService: TaskTagService) {}

  @Get('/:id')
  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.OK,
    description: 'Tag found'
  })
  public async show(@Param('id') id: number) {
    const tag = await this.taskTagService.getOne(id);
    return fillObject(TagRdo, tag);
  }

  @Get('/')
  @ApiResponse({
    type: [TagRdo],
    status: HttpStatus.OK,
    description: 'List of tags found'
  })
  public async index() {
    const tags = await this.taskTagService.getAll();
    return fillObject(TagRdo, tags);
  }

  @Post('/')
  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.CREATED,
    description: 'New tag created'
  })
  public async create(@Body() dto: CreateTagDto) {
    const tag = await this.taskTagService.create(dto)
    return fillObject(TagRdo, tag)
  }

  @Delete('/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Tag deleted'
  })
  public async destroy(@Param('id') id: number) {
    await this.taskTagService.delete(id)
  }

  @Patch('/:id')
  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.OK,
    description: 'Tag updated'
  })
  public async update(@Param('id') id: number, @Body() dto: UpdateTagDto) {
    const tag = await this.taskTagService.update(id, dto);
    return fillObject(TagRdo, tag);
  }
}
