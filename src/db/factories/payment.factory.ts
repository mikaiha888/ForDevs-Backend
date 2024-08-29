import { faker } from '@faker-js/faker';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import dataSource from '../data-source';
import { User } from 'src/modules/user/entities/user.entity';
import { Product } from 'src/modules/product/entities/product.entity';

const paymentFactory = async () => {
  const payment = new Payment();
  const usersRepository = dataSource.getRepository(User);
  const productsRepository = dataSource.getRepository(Product);

  const user = await usersRepository.find();
  const product = await productsRepository.find();

  payment.method = faker.helpers.arrayElement(['Stripe', 'MercadoPago']);
  payment.status = faker.helpers.arrayElement([
    'succeeded',
    'failed',
    'pending',
  ]);
  payment.amount = faker.number.float({ min: 100, max: 1000 });
  payment.currency = faker.helpers.arrayElement(['ARS', 'USD', 'EUR']);
  payment.quantity = 1;
  payment.user = faker.helpers.arrayElement(user);
  payment.product = faker.helpers.arrayElement(product);
  
  if (payment.product?.contract) {
    const contract = payment.product.contract;
    if (contract.receiver.plan.name === 'Premium') {
      payment.commission = (contract.product.amount * 5) / 100;
    } else {
      payment.commission = (contract.product.amount * 25) / 100;
    }
  } else {
    payment.commission = 0;
  }

  return payment;
};

export default paymentFactory;
