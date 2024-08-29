import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('links')
@ApiTags('Link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @ApiOperation({summary: 'create link'})
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.create(createLinkDto);
  }

  @Get()
  @ApiOperation({summary: 'get all links'})
  findAll() {
    return this.linkService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'get link by id'})
  findOne(@Param('id') id: string) {
    return this.linkService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'update link by id'})
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(id, updateLinkDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete link by id'})
  remove(@Param('id') id: string) {
    return this.linkService.remove(id);
  }
}
