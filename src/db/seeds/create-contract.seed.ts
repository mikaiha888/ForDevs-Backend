import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { Commission } from 'src/modules/commission/entities/commission.entity';

export default class CreateContracts implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating contracts...');

    const contractFactory = factoryManager.get(Contract);
    const commissionFactory = factoryManager.get(Commission);

    // Verifica si las factories están registradas
    if (!contractFactory || !commissionFactory) {
      console.error('Contract or Commission factory not found');
      return;
    }

    const contracts = await contractFactory.saveMany(10);

    // Crear comisiones para cada contrato
    const commissions = contracts.map((contract) =>
      commissionFactory.save({ contract }),
    );

    await Promise.all(commissions);
  }
}
