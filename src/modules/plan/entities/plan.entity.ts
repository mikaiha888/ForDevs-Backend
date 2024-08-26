import { Product } from 'src/modules/product/entities/product.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';

export type Name = 'Free' | 'Premium';

@Entity('plans')
export class Plan extends Product {
  @Column({ nullable: false, unique: true, default: 'Free' })
  name: Name;

  @Column('text', { array: true, nullable: true })
  features: string[];

  @OneToMany(() => User, (user) => user.plan)
  users: User[];
}
