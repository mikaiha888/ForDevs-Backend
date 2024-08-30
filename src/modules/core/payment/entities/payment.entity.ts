import { ProductPaymentCommon } from 'src/modules/common/entities/product-payment-common.entity';
import { Product } from 'src/modules/core/product/entities/product.entity';
import { User } from 'src/modules/core/user/entities/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Subscription } from '../../subscription/entities/subscription.entity';

@Entity()
export class Payment extends ProductPaymentCommon {
  @Column({ nullable: false })
  method: 'Stripe' | 'MercadoPago';

  @Column({ nullable: false })
  status: 'succeeded' | 'failed' | 'pending';

  @Column({ nullable: false, type: 'float' })
  commission: number;

  @ManyToOne(() => User, (user) => user.payments, { nullable: false })
  user: User;

  @ManyToOne(() => Product, (product) => product.payments)
  product: Product;

  @ManyToOne(() => Subscription, (subscription) => subscription.payments)
  subscription: Subscription;


}
