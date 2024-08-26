import { User } from 'src/modules/user/entities/user.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Contract extends Product {
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
}
