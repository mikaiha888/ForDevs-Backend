import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import CreateUserSeeder from './create-user.seed';
import CreateProjectSeeder from './create-project.seed';
import CreateTagSeeder from './create-tag.seed';
import CreateTechnologies from './create-technology.seed';
import CreateReviews from './create-review.seed';
import CreatePlans from './create-plan.seed';
import CreateLikes from './create-likes.seed';
import CreateLinks from './create-link.seed';
import CreateContracts from './create-contract.seed';
import CreateCommissions from './create-commission.seed';

export default class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await new CreatePlans().run(dataSource, factoryManager);
    await new CreateUserSeeder().run(dataSource, factoryManager);
    await new CreateTagSeeder().run(dataSource, factoryManager);
    await new CreateTechnologies().run(dataSource, factoryManager);
    await new CreateProjectSeeder().run(dataSource, factoryManager);
    await new CreateReviews().run(dataSource, factoryManager);
    await new CreateLikes().run(dataSource, factoryManager);
    await new CreateLinks().run(dataSource, factoryManager);
    await new CreateContracts().run(dataSource, factoryManager);
    await new CreateCommissions().run(dataSource, factoryManager);
  }
}
