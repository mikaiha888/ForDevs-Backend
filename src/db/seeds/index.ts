import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import { registerFactories } from '../factories';
import dataSource from '../data-source';

import CreateUserSeeder from './create-user.seed';
import CreateProjectSeeder from './create-project.seed';
import CreateTagSeeder from './create-tag.seed';
import CreateTechnologiesSeeder from './create-technology.seed';
import CreateReviewsSeeder from './create-review.seed';
import CreatePlansSeeder from './create-plan.seed';
import CreateRolesSeeder from './create-role.seed';
import CreateLikesSeeder from './create-likes.seed';
import CreateLinksSeeder from './create-link.seed';
import CreateContractsSeeder from './create-contract.seed';
// import CreatePaymentSeeder from './create-payment.seed';
import CreateProductsSeeder from './create-product.seed';

class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await new CreatePlansSeeder().run(dataSource, factoryManager);
    await new CreateRolesSeeder().run(dataSource, factoryManager);
    await new CreateUserSeeder().run(dataSource, factoryManager);
    await new CreateTagSeeder().run(dataSource, factoryManager);
    await new CreateTechnologiesSeeder().run(dataSource, factoryManager);
    await new CreateProjectSeeder().run(dataSource, factoryManager);
    await new CreateReviewsSeeder().run(dataSource, factoryManager);
    await new CreateLikesSeeder().run(dataSource, factoryManager);
    await new CreateLinksSeeder().run(dataSource, factoryManager);
    await new CreateContractsSeeder().run(dataSource, factoryManager);
    await new CreateProductsSeeder().run(dataSource,factoryManager);
    // await new CreatePaymentSeeder().run(dataSource, factoryManager);
  }
}

const run = async () => {
  let initialized = false;
  try {
    console.log('Initializing data source...');
    await dataSource.initialize();
    initialized = true;

    console.log('Registering factories...');
    registerFactories();

    console.log('Running seeders...');
    await runSeeders(dataSource, { seeds: [MainSeeder] });

  } catch (error) {
    console.error('Error running seeders:', error);
  } finally {
    if (initialized) { 
      console.log('Destroying data source...');
      await dataSource.destroy();
    }
  }
};

run();
