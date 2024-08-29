import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Payment } from 'src/modules/core/payment/entities/payment.entity';

export default class CreatePaymentSeeder implements Seeder {
  public async run(_dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {

    const paymentFactory = factoryManager.get(Payment);

    await paymentFactory.saveMany(10);
  }
}