import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commission } from './entities/commission.entity';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(Commission)
    private readonly commissionRepository: Repository<Commission>,
  ) {}

  async create(createCommissionDto: CreateCommissionDto): Promise<Commission> {
    const commission = this.commissionRepository.create(createCommissionDto);
    return this.commissionRepository.save(commission);
  }

  async findAll(): Promise<Commission[]> {
    return this.commissionRepository.find();
  }

  async findOne(id: string): Promise<Commission> {
    const commission = await this.commissionRepository.findOne({
      where: { id },
      relations: ['contract'], 
    });
    if (!commission) {
      throw new NotFoundException(`Commission with id ${id} not found`);
    }
    return commission;
  }

  async update(id: string, updateCommissionDto: UpdateCommissionDto): Promise<Commission> {
    const commission = await this.commissionRepository.findOne({
      where: { id },
    });
    if (!commission) {
      throw new NotFoundException(`Commission with id ${id} not found`);
    }

    Object.assign(commission, updateCommissionDto);
    return this.commissionRepository.save(commission);
  }

  async remove(id: string): Promise<void> {
    const commission = await this.commissionRepository.findOne({
      where: { id },
    });
    if (!commission) {
      throw new NotFoundException(`Commission with id ${id} not found`);
    }

    await this.commissionRepository.remove(commission);
  }
}
