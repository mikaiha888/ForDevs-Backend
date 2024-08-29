import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  async create(createLinkDto: CreateLinkDto): Promise<Link> {
    const link = this.linkRepository.create(createLinkDto);
    return this.linkRepository.save(link);
  }

  async findAll(): Promise<Link[]> {
    return this.linkRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Link> {
    const link = await this.linkRepository.findOne({ where: { id }, relations: ['user'] });
    if (!link) {
      throw new NotFoundException(`Link with ID ${id} not found`);
    }
    return link;
  }

  async update(id: string, updateLinkDto: UpdateLinkDto): Promise<Link> {
    const link = await this.linkRepository.preload({
      id,
      ...updateLinkDto,
    });

    if (!link) {
      throw new NotFoundException(`Link with ID ${id} not found`);
    }

    return this.linkRepository.save(link);
  }

  async remove(id: string): Promise<void> {
    const link = await this.findOne(id);
    await this.linkRepository.remove(link);
  }
}
