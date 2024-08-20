import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Tag } from '../../modules/tag/entities/tag.entity';

export default class CreateTags implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating tags...');
    const tagFactory = factoryManager.get(Tag);
    
    // Si la factory no está definida, lanza un error (manejo básico)
    if (!tagFactory) {
      console.error('Tag factory not found');
      return;
    }

    await tagFactory.saveMany(10);
    console.log('Tags created');
  }
}
