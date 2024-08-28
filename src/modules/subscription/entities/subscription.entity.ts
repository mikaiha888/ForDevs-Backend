import {
  Entity,
  ManyToOne,
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

  @Column()
  status: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
