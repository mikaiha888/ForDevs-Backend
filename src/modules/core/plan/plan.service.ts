import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan, Name } from './entities/plan.entity';
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

  async findOne(name: Name): Promise<Plan> {
    return this.planRepository.findOneBy({ name });
  }

  async update(
    name: Name,
    updatePlanDto: UpdatePlanDto,
  ): Promise<Plan> {
    await this.planRepository.update(name, updatePlanDto);
    return this.planRepository.findOneBy({ name });
  }

  async remove(name: Name): Promise<void> {
    await this.planRepository.delete(name);
  }
}
