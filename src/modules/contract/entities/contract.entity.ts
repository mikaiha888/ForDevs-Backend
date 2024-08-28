import { User } from 'src/modules/user/entities/user.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductPaymentCommon } from 'src/modules/common/entities/product-payment-common.entity';

@Entity()
export class Contract extends ProductPaymentCommon{

  @Column({ nullable: false, length: 255, default: 'Project Contract' })
  title: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ nullable: false, length: 50, default: 'Now' })
  availableTime: string;

  @Column({ nullable: false, default: 'pending' })
  status: 'rejected' | 'pending' | 'accepted';

  @Column({ nullable: true })
  paymentProviderId: string;

  @ManyToOne(() => User, (user) => user.contracts)
  @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
  sender: User;

  @ManyToOne(() => User, (user) => user.contracts)
  @JoinColumn({ name: 'receiver_id', referencedColumnName: 'id' })
  receiver: User;

  @OneToOne(() => Product, (product) => product.contract,)
  @JoinColumn ({name: 'productId', referencedColumnName: 'id'})
  product: Product;
}
