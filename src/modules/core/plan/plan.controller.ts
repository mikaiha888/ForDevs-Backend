import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Name } from './entities/plan.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('plan')
@ApiTags('Plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @ApiOperation({summary: 'create plan'})
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Get()
  @ApiOperation({summary: 'get all plans'})
  findAll() {
    return this.planService.findAll();
  }

  @Get(':name')
  @ApiOperation({summary: 'get plan by name'})
  findOne(@Param('name') name: Name) {
    return this.planService.findOne(name);
  }

  @Patch(':name')
  @ApiOperation({summary: 'update plan'})
  update(@Param('name') name: Name, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(name, updatePlanDto);
  }

  @Delete(':name')
  @ApiOperation({summary: 'delete plan'})
  remove(@Param('name') name: Name) {
    return this.planService.remove(name);
  }
}
