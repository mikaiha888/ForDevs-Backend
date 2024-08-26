import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.payments, { nullable: false })
  user: User;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false })
  currency: string;

  @Column({ nullable: false })
  paymentMethod: 'Stripe' | 'MercadoPago'

  @Column({ nullable: false })
  status: 'succeeded' | 'failed' | 'pending'

  @CreateDateColumn()
  createdAt: Date;
}
