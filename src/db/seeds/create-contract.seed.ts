import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Contract } from 'src/modules/utility/contract/entities/contract.entity';

export default class CreateContracts implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating contracts...');
    const contractFactory = factoryManager.get(Contract);

    if (!contractFactory) {
      console.error('Contract factory not found');
      return;
    }

    await contractFactory.saveMany(10);
    console.log('Contracts created');
  }
}
