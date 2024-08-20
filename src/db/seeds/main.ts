import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import CreateUserSeeder from './create-user.seed';
import CreateProjectSeeder from './create-project.seed';
import CreateTagSeeder from './create-tag.seed';
import CreateTechnologies from './create-technology.seed';
import CreateReviews from './create-review.seed';

export default class MainSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    // Ejecutar los seeders en el orden deseado
    await new CreateUserSeeder().run(dataSource, factoryManager);
    await new CreateTagSeeder().run(dataSource, factoryManager);
    await new CreateTechnologies().run(dataSource, factoryManager);
    await new CreateReviews().run(dataSource, factoryManager);
    await new CreateProjectSeeder().run(dataSource, factoryManager);
  }
}
