import {
  Entity,
  JoinColumn,
  OneToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { ProductPaymentCommon } from 'src/modules/common/entities/product-payment-common.entity';

@Entity()
export class Subscription extends ProductPaymentCommon {
  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false, default: 'pending' })
  status: string;

  @Column({ nullable: false, default: new Date() })
  startDate: Date;

  @Column({ nullable: true, default: null })
  endDate: Date;

  @OneToMany(() => Payment, (payment) => payment.product)
  payments: Payment[];
}
