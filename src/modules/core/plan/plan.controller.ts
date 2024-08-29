import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Name } from './entities/plan.entity';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: Name) {
    return this.planService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: Name, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(name, updatePlanDto);
  }

  @Delete(':name')
  remove(@Param('name') name: Name) {
    return this.planService.remove(name);
  }
}
