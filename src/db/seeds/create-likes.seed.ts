import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Like } from '../../modules/utility/like/entities/like.entity';

export default class CreateLikes implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating likes...');
    const likeFactory = factoryManager.get(Like);
    
    if (!likeFactory) {
      console.error('Like factory not found');
      return;
    }

    await likeFactory.saveMany(10);
    console.log('Likes created');
  }
}
