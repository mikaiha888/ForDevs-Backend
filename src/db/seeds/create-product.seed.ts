import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Product } from 'src/modules/product/entities/product.entity';

export default class CreateProducts implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating products...');
    const productFactory = factoryManager.get(Product);
    
    if (!productFactory) {
      console.error('Product factory not found');
      return;
    }

    await productFactory.saveMany(10);
    console.log('Products created');
  }
}
