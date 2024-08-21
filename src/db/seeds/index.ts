import dataSource from '../data-source';
import { runSeeders } from 'typeorm-extension';
import { registerFactories } from '../factories';

const run = async () => {
  console.log('Initializing data source...');
  await dataSource.initialize();
  console.log('Registering factories...');
  registerFactories();
  console.log('Running seeders...');
  await runSeeders(dataSource);
  console.log('Destroying data source...');
  await dataSource.destroy();
};

run();
