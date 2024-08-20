import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Plan } from 'src/modules/plan/entities/plan.entity';

export default class CreatePlans implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const planRepository = dataSource.getRepository(Plan);

    const planData = [
      { planName: 'Free', price: 0.0 },
      { planName: 'Premium', price: 10.0 },
      { planName: 'Admin', price: 20.0 }
    ];

    for (const { planName, price } of planData) {
      const plan = await factoryManager.get(Plan).make({ planName, price } as any);
      await planRepository.save(plan);
    }

    console.log('Plans created');
  }
}
