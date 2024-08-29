import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Product } from 'src/modules/product/entities/product.entity';
import { Plan } from 'src/modules/plan/entities/plan.entity';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { faker } from '@faker-js/faker';

export default class CreateProducts implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating products...');

    const productFactory = factoryManager.get(Product);
    const planRepository = dataSource.getRepository(Plan);
    const contractRepository = dataSource.getRepository(Contract);

    if (!productFactory) {
      console.error('Product factory not found');
      return;
    }

    const plans = await planRepository.find();
    const contracts = await contractRepository.find();

    for (const plan of plans) {
      const product = await productFactory.make({
        amount: plan.name === 'Free' ? 0 : 10.0,
        quantity: 1,
        currency: 'ARS',
        description:
          plan.name === 'Free'
            ? 'Plan gratuito con acceso limitado.'
            : 'Plan premium con acceso completo a todas las funcionalidades.',
        type: 'plan',
        plan: plan,
      });

      await dataSource.getRepository(Product).save(product);
    }

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
