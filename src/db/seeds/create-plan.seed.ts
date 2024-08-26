import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Plan } from '../../modules/plan/entities/plan.entity';

export default class CreatePlans implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Creating plans...');

    const planFactory = factoryManager.get(Plan);

    if (!planFactory) {
      console.error('Plan factory not found');
      return;
    }

    const freePlan = await planFactory.make({
      name: 'Free',
      amount: 0,
      quantity: 1,
      currency: 'ARS',
      description: 'Plan gratuito con acceso limitado.',
      features: ['Acceso a funcionalidades básicas', 'Hasta 5 proyectos', 'Soporte comunitario']
    });
    const premiumPlan = await planFactory.make({
      name: 'Premium',
      amount: 10.0,
      quantity: 1,
      currency: 'ARS',
      description: 'Plan premium con acceso completo a todas las funcionalidades.',
      features: [
        'Acceso a todas las funcionalidades',
        'Proyectos ilimitados',
        'Soporte prioritario',
        'Acceso a recursos exclusivos',
        'Capacitación personalizada'
      ]
    });

    await dataSource.getRepository(Plan).save([freePlan, premiumPlan]);

    console.log('Plans created');
  }
}
