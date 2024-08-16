import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { Plan } from '../../modules/plan/entities/plan.entity';
import dataSource from '../../../ormconfig'; 

export default class CreatePlans implements Seeder {
  public async run(factory: Factory, connection: DataSource): Promise<void> {
    const ormconfig = new DataSource(dataSource);
    await ormconfig.initialize();

    await ormconfig
      .createQueryBuilder()
      .insert()
      .into(Plan)
      .values([
        { planName: 'Free', price: 0.0 },
        { planName: 'Premium', price: 10.0 },
        { planName: 'Admin', price: 0.0 },
      ])
      .orIgnore()
      .execute();

    await ormconfig.destroy();
  }
}
