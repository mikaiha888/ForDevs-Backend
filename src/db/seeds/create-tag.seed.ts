import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Tag } from '../../modules/tag/entities/tag.entity';

export default class CreateTags implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const tagFactory = factoryManager.get(Tag);
    await tagFactory.saveMany(10);
    console.log('Tags created');    
  }
}
