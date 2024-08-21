import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Review } from '../../modules/review/entities/review.entity';

export default class CreateReviews implements Seeder {
    public async run(
      dataSource: DataSource,
      factoryManager: SeederFactoryManager,
    ): Promise<void> {
      console.log('Creating reviews...');
      const reviewFactory = factoryManager.get(Review);
      
      if (!reviewFactory) {
        console.error('Review factory not found');
        return;
      }
  
      await reviewFactory.saveMany(10);
      console.log('Reviews created');
    }
  }