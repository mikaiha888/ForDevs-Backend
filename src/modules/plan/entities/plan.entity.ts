import { ProductPaymentCommon } from 'src/modules/common/entities/product-payment-common.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type Name = 'Free' | 'Premium';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ nullable: false, unique: true, default: 'Free' })
  name: Name;

  @Column('text', { array: true, nullable: true })
  features: string[];

  @OneToOne(() => Product, (product) => product.plan, )
  @JoinColumn ({name: 'productId', referencedColumnName: 'id'})
  product: Product;

  @OneToMany(() => User, (user) => user.plan)
  users: User[];
}