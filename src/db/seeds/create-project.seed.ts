import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Project } from '../../modules/project/entities/project.entity';

export default class CreateProjects implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const projectFactory = factoryManager.get(Project);
    await projectFactory.saveMany(10);
    console.log('Projects created');  
  }
}
