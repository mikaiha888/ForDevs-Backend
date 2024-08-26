import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '../../modules/role/entities/role.entity';

export default class CreateRoles implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating roles...');

    const roleFactory = factoryManager.get(Role);

    if (!roleFactory) {
      console.error('Role factory not found');
      return;
    }

    const userRole = await roleFactory.make({ name: 'User' });
    const adminRole = await roleFactory.make({ name: 'Admin' });

    await dataSource.getRepository(Role).save([userRole, adminRole]);

    console.log('Roles created');
  }
}
