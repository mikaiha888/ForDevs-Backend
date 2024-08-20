import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Link } from '../../modules/link/entities/link.entity';

export default class CreateLinks implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating links...');
    const linkFactory = factoryManager.get(Link);
    
    if (!linkFactory) {
      console.error('Link factory not found');
      return;
    }

    await linkFactory.saveMany(10);
    console.log('Links created');
  }
}
