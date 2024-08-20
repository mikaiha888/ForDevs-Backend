import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Project } from '../../modules/project/entities/project.entity';

export default class CreateProjects implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating projects...');
    const projectFactory = factoryManager.get(Project);
    
    // Verifica si la factory está registrada
    if (!projectFactory) {
      console.error('Project factory not found');
      return;
    }

    await projectFactory.saveMany(10);
    console.log('Projects created');
  }
}
