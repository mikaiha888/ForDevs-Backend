import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
  @InjectRepository(Subscription)
  private readonly subscriptionRepository: Repository<Subscription>,
) {}

async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
  const subscription = this.subscriptionRepository.create({
    id: createSubscriptionDto.id,
    user: createSubscriptionDto.user ,
    status: createSubscriptionDto.status,
  });
  return this.subscriptionRepository.save(subscription);
}


  findAll() {
    return `This action returns all subscription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
