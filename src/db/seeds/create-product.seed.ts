import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Product } from 'src/modules/core/product/entities/product.entity';
import { Contract } from 'src/modules/utility/contract/entities/contract.entity';
import { faker } from '@faker-js/faker';

export default class CreateProducts implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating products...');

    const productFactory = factoryManager.get(Product);
    const contractRepository = dataSource.getRepository(Contract);

    if (!productFactory) {
      console.error('Product factory not found');
      return;
    }

    const contracts = await contractRepository.find();


    for (const contract of contracts) {
      const product = await productFactory.make({
        description: `Product for ${contract.title}`,
        amount: faker.number.float({ min: 100, max: 1000 }),
        quantity: 1,
        currency: 'ARS',
        type: 'contract',
        contract: contract,
      });

      await dataSource.getRepository(Product).save(product);
    }

    console.log('Products created');
  }
}
