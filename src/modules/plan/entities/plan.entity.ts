import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('plans')
export class Plan {
  @PrimaryColumn({ default: 'Free' })
  planName: 'Free' | 'Premium' | 'Admin';

  @Column('float', { nullable: false, default: 0.0 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.plan)
  users: User[];
}
