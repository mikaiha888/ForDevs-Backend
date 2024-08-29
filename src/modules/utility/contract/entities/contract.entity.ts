import { User } from 'src/modules/core/user/entities/user.entity';
import { Product } from 'src/modules/core/product/entities/product.entity';
import {
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 255, default: 'Project Contract' })
  title: string;

  @Column({ nullable: false, length: 50, default: 'Now' })
  availableTime: string;

  @Column({ nullable: false, default: 'pending' })
  status: 'rejected' | 'pending' | 'accepted';

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
