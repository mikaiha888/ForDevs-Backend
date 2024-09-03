import { Payment } from 'src/modules/core/payment/entities/payment.entity';
import { Product } from 'src/modules/core/product/entities/product.entity';
import { Subscription } from 'src/modules/core/subscription/entities/subscription.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class CreatePayments implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating payments...');

    const productRepository = dataSource.getRepository(Product);
    const subscriptionRepository = dataSource.getRepository(Subscription);

    const subscriptions = await subscriptionRepository.find({ take: 3 });
    const products = await productRepository.find({
      relations: ['contract.receiver.plan'],
      take: 5,
    });

    const paymentFactory = factoryManager.get(Payment);

    if (!paymentFactory) {
      console.error('Payment factory not found');
      return;
    }

    for (const subscription of subscriptions) {
      const payment = await paymentFactory.make();
      payment.subscription = subscription;
      payment.product = null;
      payment.amount = subscription.amount;
      payment.currency = subscription.currency;
      payment.commission = 0;

      await dataSource.getRepository(Payment).save(payment);
    }

    for (const product of products) {
      const contract = product.contract;
      const receiver = contract?.receiver;
      const plan = receiver?.plan;

      const commission = plan
        ? (product.amount * (plan.name === 'Free' ? 25 : 5)) / 100
        : 0;

      const payment = await paymentFactory.make();
      payment.product = product;
      payment.subscription = null;
      payment.amount = product.amount;
      payment.currency = product.currency;
      payment.commission = commission;

      await dataSource.getRepository(Payment).save(payment);
    }

    console.log('Payments created');
  }
}
