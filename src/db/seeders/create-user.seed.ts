import { User } from 'src/modules/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
export default class CreateUsers implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(10);
  }
}
