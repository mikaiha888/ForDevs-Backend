import { ProductPaymentCommon } from 'src/modules/common/entities/product-payment-common.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Payment extends ProductPaymentCommon {
  @Column({ nullable: false })
  method: 'Stripe' | 'MercadoPago';

  @Column({ nullable: false })
  status: 'succeeded' | 'failed' | 'pending';

  @ManyToOne(() => User, (user) => user.payments, { nullable: false })
  user: User;

  @ManyToOne(() => Product, (product) => product.payments, { nullable: false })
  product: Product;
}
