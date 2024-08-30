import { ProductPaymentCommon } from 'src/modules/common/entities/product-payment-common.entity';
import { Contract } from 'src/modules/utility/contract/entities/contract.entity';
import { Payment } from 'src/modules/core/payment/entities/payment.entity';
import { Entity, Column, OneToMany, OneToOne} from 'typeorm';

@Entity()
export class Product extends ProductPaymentCommon {
  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ nullable: false, type: 'text'})
  type: 'contract';

  @OneToOne(() => Contract, (contract) => contract.product, { eager: true })
  contract: Contract;

  @OneToMany(() => Payment, (payment) => payment.product)
  payments: Payment[];
}
