import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Plan } from '../../modules/plan/entities/plan.entity';

export default class CreatePlans implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating plans...');

    const planFactory = factoryManager.get(Plan);

    if (!planFactory) {
      console.error('Plan factory not found');
      return;
    }

    const freePlan = await planFactory.make({ name: 'Free', price: 0 });
    const premiumPlan = await planFactory.make({ name: 'Premium', price: 10.0 });

    await dataSource.getRepository(Plan).save([freePlan, premiumPlan]);

    console.log('Plans created');
  }
}
