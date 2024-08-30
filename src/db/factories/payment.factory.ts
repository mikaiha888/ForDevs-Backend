import { faker } from '@faker-js/faker';
import { Payment } from 'src/modules/core/payment/entities/payment.entity';
import dataSource from '../data-source';
import { User } from 'src/modules/core/user/entities/user.entity';

const paymentFactory = async () => {
  const payment = new Payment();
  const usersRepository = dataSource.getRepository(User);

  const users = await usersRepository.find();

  payment.method = faker.helpers.arrayElement(['Stripe', 'MercadoPago']);
  payment.status = faker.helpers.arrayElement([
    'succeeded',
    'failed',
    'pending',
  ]);
  payment.quantity = 1;
  payment.user = faker.helpers.arrayElement(users);

  return payment;
};

export default paymentFactory;
