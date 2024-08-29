import { Contract } from 'src/modules/utility/contract/entities/contract.entity';
import { Link } from 'src/modules/utility/link/entities/link.entity';
import { Payment } from 'src/modules/core/payment/entities/payment.entity';
import { Plan } from 'src/modules/core/plan/entities/plan.entity';
import { Project } from 'src/modules/auxiliary/project/entities/project.entity';
import { Review } from 'src/modules/auxiliary/review/entities/review.entity';
import { Role } from 'src/modules/auxiliary/role/entities/role.entity';
import { Subscription } from 'src/modules/core/subscription/entities/subscription.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true, length: 255 })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, length: 300 })
  bio: string;

  @Column({ nullable: true, length: 5000 })
  aboutMe: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  coverImage: string;

  @OneToOne(() => Subscription, (subscription) => subscription.user, {eager: true})
  @JoinColumn ({name: 'subscriptionId', referencedColumnName: 'id'})
  subscription: Subscription;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'roleName', referencedColumnName: 'name' })
  role: Role;

  @OneToMany(() => Project, (project) => project.user, { eager: true })
  projects: Project[];

  @OneToMany(() => Review, (review) => review.reviewer, { eager: true })
  reviews: Review[];

  @OneToMany(() => Contract, (contract) => contract.sender, { eager: true })
  contracts: Contract[];

  @OneToMany(() => Link, (link) => link.user, { eager: true })
  links: Link[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @ManyToOne(() => Plan, (plan) => plan.users, { eager: true })
  @JoinColumn({ name: 'planName', referencedColumnName: 'name' })
  plan: Plan;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
