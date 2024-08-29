import {
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Column,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Subscription {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false, default: 'pending' })
  status: string;

  @Column({ nullable: false, default: new Date() })
  startDate: Date;

  @Column({ nullable: true, default: null })
  endDate: Date;
}
