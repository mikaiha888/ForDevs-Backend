import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type Name = 'User' | 'Admin'

@Entity('roles')
export class Role {
  @PrimaryColumn({ default: 'User' })
  name: Name;

  @OneToMany(() => User, (user) => user.plan)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
