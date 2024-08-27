import { Product } from 'src/modules/product/entities/product.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';

export type Name = 'Free' | 'Premium';

export type PaymentFrequency = 'monthly' | 'yearly';

@Entity('plans')
export class Plan extends Product {
  @Column({ nullable: false, unique: true, default: 'Free' })
  name: Name;

  @Column('text', { array: true, nullable: true })
  features: string[];

  @Column({ type: 'enum', enum: ['monthly', 'yearly'], default: 'monthly' })
  frequency: PaymentFrequency; 

  @Column({ nullable: true, type: 'int', default: 0 })
  trialPeriodDays: number;  

  @Column({ nullable: true })
  paymentProviderId: string;  

  @Column({ nullable: true })
  status: string;  

  @Column({ length: 10, nullable: true })
  currency: 'ARS' | 'USD' | 'EUR'; 

  @Column({ nullable: true })
  initPoint: string; 

  @Column({ nullable: true })
  applicationId: string; 

  @Column({ nullable: true, type: 'int', default: 0 })
  subscribedCount: number; 

  @Column({ nullable: true })
  stripeProductId: string;

  @Column({ nullable: true })
  stripePriceId: string; 

  @OneToMany(() => User, (user) => user.plan)
  users: User[];
}
