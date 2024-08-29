import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from 'src/modules/core/user/entities/user.entity';

export default class CreateUserSeeder implements Seeder {
  public async run(_dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {

    const userFactory = factoryManager.get(User);

    await userFactory.saveMany(10);
  }
}
