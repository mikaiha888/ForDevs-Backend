import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({summary: 'create role'})
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({summary: 'get all roles'})
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'get role by id'})
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'update role by id'})
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete role by id'})
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
