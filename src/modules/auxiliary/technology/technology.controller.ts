import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('technology')
@ApiTags('Technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Post()
  @ApiOperation({summary: 'create technology'})
  create(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.technologyService.create(createTechnologyDto);
  }

  @Get()
  @ApiOperation({summary: 'get all technologies'})
  findAll() {
    return this.technologyService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'get technology by id'})
  findOne(@Param('id') id: string) {
    return this.technologyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'update technology by id'})
  update(@Param('id') id: string, @Body() updateTechnologyDto: UpdateTechnologyDto) {
    return this.technologyService.update(id, updateTechnologyDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete technology by id'})
  remove(@Param('id') id: string) {
    return this.technologyService.remove(id);
  }
}
