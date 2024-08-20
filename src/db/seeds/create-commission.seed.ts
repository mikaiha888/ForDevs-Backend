import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Commission } from 'src/modules/commission/entities/commission.entity';

export default class CreateCommissions implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating commissions...');
    const commissionFactory = factoryManager.get(Commission);

    if (!commissionFactory) {
      console.error('Commission factory not found');
      return;
    }

    await commissionFactory.saveMany(10);
    console.log('Commissions created');
  }
}
