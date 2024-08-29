import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({summary: 'create review'})
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({summary: 'get all reviews'})
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'get review by id'})
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'update review by id'})
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete review by id'})
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
