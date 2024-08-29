import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagsRepository: Repository<Tag>) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const existingTag = await this.tagsRepository.findOne({
      where: { name: createTagDto.name },
    });
    if (existingTag) {
      throw new BadRequestException('Tag already exists.');
    }

    const tags = this.tagsRepository.create(createTagDto);
    return this.tagsRepository.save(tags);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.tagsRepository.preload({
      id: id,
      ...updateTagDto,
    });
    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }
    return this.tagsRepository.save(tag);
  }

  async remove(id: string): Promise<void> {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }
    await this.tagsRepository.remove(tag);
  }
}
