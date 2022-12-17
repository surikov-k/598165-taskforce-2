import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ContractorReviewService } from './contractor-review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { fillObject } from '@task-force/core';
import { ReviewRdo } from './rdo/review.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('review')
@Controller('review')
export class ContractorReviewController {
  constructor(private readonly reviewService: ContractorReviewService) {}

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new review was successfully created'
  })
  public async create(@Body() dto: CreateReviewDto) {
    const review = await this.reviewService.create(dto)
    return fillObject(ReviewRdo, review)
  }

  @Get('/:id')
  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'Review is found'
  })
  public async show(@Param('id') id: string) {
    const reviewId = parseInt(id, 10);
    const review = await this.reviewService.getOne(reviewId);
    return fillObject(ReviewRdo, review);
  }

  @Get('/')
  @ApiResponse({
    type: [ReviewRdo],
    status: HttpStatus.OK,
    description: 'List of reviews is found'
  })
  public async index() {
    const reviews = await this.reviewService.getAll();
    return fillObject(ReviewRdo, reviews);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Review was deleted'
  })
  public async delete(@Param('id') id: string) {
    const reviewId = parseInt(id, 10);
    await this.reviewService.delete(reviewId);
  }
}
