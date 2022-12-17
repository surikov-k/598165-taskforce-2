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
  public async show(@Param('id') id: string) {
    const tagId = parseInt(id, 10);
    const tag = await this.taskTagService.getOne(tagId);
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
  public async destroy(@Param('id') id: string) {
    const tagId = parseInt(id, 10);
    await this.taskTagService.delete(tagId)
  }

  @Patch('/:id')
  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.OK,
    description: 'Tag updated'
  })
  public async update(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    const tagId = parseInt(id, 10);
    const tag = await this.taskTagService.update(tagId, dto);
    return fillObject(TagRdo, tag);
  }
}
