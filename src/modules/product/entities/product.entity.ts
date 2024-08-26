import { ProductPaymentCommon } from 'src/modules/common/entities/product-payment-common.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class Product extends ProductPaymentCommon {
  @Column({ nullable: false, type: 'text' })
  description: string;

  @OneToMany(() => Payment, (payment) => payment.product)
  payments: Payment[];
}
