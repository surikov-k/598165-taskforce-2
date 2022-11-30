import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ContractorReviewService } from './contractor-review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { fillObject } from '@task-force/core';
import { ReviewRdo } from './rdo/review.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('review')
@Controller('review')
export class ContractorReviewController {
  constructor(
    private readonly reviewService: ContractorReviewService
  ) {
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new review was successfully created'
  })
  public async create(@Body() dto: CreateReviewDto) {
    const review = await this.reviewService.create(dto)
    return fillObject(ReviewRdo, review)
  }

  @Get(':id')
  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'The review is found'
  })
  public async show(@Param('id') id: string) {
    const review = await this.reviewService.getOne(id);
    return fillObject(ReviewRdo, review);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The review was deleted'
  })
  public async delete(@Param('id') id: string) {
    await this.reviewService.delete(id);
  }
}
