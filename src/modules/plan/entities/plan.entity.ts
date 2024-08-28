import { ProductPaymentCommon } from 'src/modules/common/entities/product-payment-common.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';

export type Name = 'Free' | 'Premium';

@Entity()
export class Plan extends ProductPaymentCommon {
  
  @Column({ nullable: false, unique: true, default: 'Free' })
  name: Name;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column('text', { array: true, nullable: true })
  features: string[];

  @OneToOne(() => Product, (product) => product.plan, )
  @JoinColumn ({name: 'productId', referencedColumnName: 'id'})
  product: Product;

}