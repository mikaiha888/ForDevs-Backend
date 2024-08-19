import dataSource from '../data-source';
import { runSeeders } from 'typeorm-extension';
import { registerFactories } from '../factories';

const run = async () => {
  await dataSource.initialize();
  registerFactories();
  await runSeeders(dataSource);
  await dataSource.destroy();
};

run();
