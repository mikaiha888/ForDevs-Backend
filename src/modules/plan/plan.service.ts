import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan, PlanName } from './entities/plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const plan = this.planRepository.create(createPlanDto);
    return this.planRepository.save(plan);
  }

  async findAll(): Promise<Plan[]> {
    return this.planRepository.find();
  }

  async findOne(planName: PlanName): Promise<Plan> {
    return this.planRepository.findOneBy({ planName });
  }

  async update(
    planName: PlanName,
    updatePlanDto: UpdatePlanDto,
  ): Promise<Plan> {
    await this.planRepository.update(planName, updatePlanDto);
    return this.planRepository.findOneBy({ planName });
  }

  async remove(planName: PlanName): Promise<void> {
    await this.planRepository.delete(planName);
  }
}
