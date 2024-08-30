import { User } from 'src/modules/core/user/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
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

  @Column({ nullable: false, type: 'text' })
  description: string;

  @OneToMany(() => User, (user) => user.plan)
  users: User[];
}