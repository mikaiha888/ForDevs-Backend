import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async create(createLikeDto: CreateLikeDto): Promise<Like> {
    const like = this.likeRepository.create({
      user: { id: createLikeDto.userId },
      project: { id: createLikeDto.projectId },
    });
    return this.likeRepository.save(like);
  }
  

  async findAll(): Promise<Like[]> {
    return this.likeRepository.find();
  }

  async findOne(id: string): Promise<Like> {
    const like = await this.likeRepository.findOne({ where: { id } });
    if (!like) {
      throw new NotFoundException(`Like with id ${id} not found`);
    }
    return like;
  }

  async update(id: string, updateLikeDto: UpdateLikeDto): Promise<Like> {
    const like = await this.likeRepository.findOne({ where: { id } });
    if (!like) {
      throw new NotFoundException(`Like with id ${id} not found`);
    }
  
    Object.assign(like, updateLikeDto);
    return this.likeRepository.save(like);
  }

  async remove(id: string): Promise<void> {
    const like = await this.likeRepository.findOne({ where: { id } });
    if (!like) {
      throw new NotFoundException(`Like with id ${id} not found`);
    }

    await this.likeRepository.remove(like);
  }
}
