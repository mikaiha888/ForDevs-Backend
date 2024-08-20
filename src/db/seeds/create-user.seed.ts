import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from 'src/modules/user/entities/user.entity';

export default class CreateUserSeeder implements Seeder {
  public async run(_dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    // Obtiene la factory para User
    const userFactory = factoryManager.get(User);

    // Genera y guarda 10 usuarios
    await userFactory.saveMany(10);
  }
}
