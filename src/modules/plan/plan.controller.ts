import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanName } from './entities/plan.entity';

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

  @Get(':planName')
  findOne(@Param('planName') planName: PlanName) {
    return this.planService.findOne(planName);
  }

  @Patch(':planName')
  update(@Param('planName') planName: PlanName, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(planName, updatePlanDto);
  }

  @Delete(':planName')
  remove(@Param('planName') planName: PlanName) {
    return this.planService.remove(planName);
  }
}
