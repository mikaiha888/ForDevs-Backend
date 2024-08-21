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

    const freePlan = await planFactory.make({ planName: 'Free', price: 0 });
    const premiumPlan = await planFactory.make({ planName: 'Premium', price: 10.0 });
    const adminPlan = await planFactory.make({ planName: 'Admin', price: 20.0 });

    await dataSource.getRepository(Plan).save([freePlan, premiumPlan, adminPlan]);

    console.log('Plans created');
  }
}
