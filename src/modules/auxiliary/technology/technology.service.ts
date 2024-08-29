import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Technology } from './entities/technology.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TechnologyService {
  constructor(@InjectRepository(Technology) private techRepository: Repository<Technology>) { }
  
  async create(createTechnologyDto: CreateTechnologyDto): Promise<Technology> {
    const existingTech = await this.techRepository.findOne({
      where: { name: createTechnologyDto.name },
    })
    if (existingTech) {
      throw new BadRequestException('Technology already exists')
    }

    const techs = this.techRepository.create(createTechnologyDto)
    return this.techRepository.save(techs)
  }

  async findAll(): Promise<Technology[]> {
    return this.techRepository.find();
  }

  async findOne(id: string): Promise<Technology> {
    const tech = await this.techRepository.findOne({ where: { id } })
    if (!tech) {
      throw new NotFoundException(`Technology with id ${id} not found`)
    }
    return tech
  }

  async update(id: string, updateTechnologyDto: UpdateTechnologyDto): Promise<Technology> {
    const tech = await this.techRepository.preload({
      id: id,
      ...updateTechnologyDto,
    })
    if(!tech){
      throw new NotFoundException(`Technology with id ${id} not found`)
    }
    return this.techRepository.save(tech)
  }

  async remove(id: string): Promise<void> {
    const tech = await this.findOne(id)
    if (!tech) {
      throw new NotFoundException(`Technology with id ${id} not found`);
    }
    await this.techRepository.remove(tech)
  }
}
