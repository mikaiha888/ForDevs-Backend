import { Subscription } from 'src/modules/core/subscription/entities/subscription.entity';
import { User } from 'src/modules/core/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class CreateSubscriptions implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating subscriptions...');

    const usersRepository = dataSource.getRepository(User);
    
    const users = await usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.subscription', 'subscription')
      .where('subscription.id IS NULL')
      .take(10)
      .getMany();

    const subscriptionFactory = factoryManager.get(Subscription);

    if (!subscriptionFactory) {
      console.error('Subscription factory not found');
      return;
    }

    for (const user of users) {
      const existingSubscription = await dataSource.getRepository(Subscription).findOne({
        where: { user: { id: user.id } },
      });

      if (existingSubscription) {
        console.log(`User ${user.id} already has a subscription. Skipping...`);
        continue;
      }

      const subscription = await subscriptionFactory.make();
      subscription.user = user;

      await dataSource.getRepository(Subscription).save(subscription);
    }

    console.log('Subscriptions created');
  }
}
