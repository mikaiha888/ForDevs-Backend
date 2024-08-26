import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export type Name = 'Free' | 'Premium';

@Entity('plans')
export class Plan {
  @PrimaryColumn({ default: 'Free' })
  name: Name;

  @Column('float', { nullable: false, default: 0.0 })
  price: number;

  @OneToMany(() => User, (user) => user.plan)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
