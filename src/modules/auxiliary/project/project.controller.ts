import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('project')
@ApiTags('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({summary: 'create project'})
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({summary: 'get all projects'})
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'get project by id'})
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'update project by id'})
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete project by id'})
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
