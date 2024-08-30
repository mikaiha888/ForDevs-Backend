import { faker } from '@faker-js/faker';
import dataSource from '../data-source';
import { Subscription } from 'src/modules/core/subscription/entities/subscription.entity';
import { Plan } from 'src/modules/core/plan/entities/plan.entity';

const subscriptionFactory = async () => {
  const subscription = new Subscription();

  const planRepository = dataSource.getRepository(Plan);

  const plans = await planRepository.find();

  const plan = plans[Math.floor(Math.random() * plans.length)];
  if (plan.name === 'Free') {
    subscription.amount = 0;
  } else {
    subscription.amount = 10;
  }
  subscription.currency = 'ARS';
  subscription.quantity = 1;
  subscription.status = 'approved';
  subscription.startDate = faker.date.recent();

  return subscription;
};

export default subscriptionFactory;
