import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('like')
@ApiTags('Like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @ApiOperation({summary: 'create like'})
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto);
  }

  @Get()
  @ApiOperation({summary: 'get all likes'})
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'get like by id'})
  findOne(@Param('id') id: string) {
    return this.likeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'update like by id'})
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likeService.update(id, updateLikeDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete like by id'})
  remove(@Param('id') id: string) {
    return this.likeService.remove(id);
  }
}
