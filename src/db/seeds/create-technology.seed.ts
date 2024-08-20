import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Technology } from '../../modules/technology/entities/technology.entity';

export default class CreateTechnologies implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating tecnologies...');
    const technologyFactory = factoryManager.get(Technology);
    
    if (!technologyFactory) {
      console.error('Technology factory not found');
      return;
    }

    await technologyFactory.saveMany(10);
    console.log('Technologys created');
  }
}
