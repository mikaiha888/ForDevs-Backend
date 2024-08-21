import { Contract } from 'src/modules/contract/entities/contract.entity';
import { Link } from 'src/modules/link/entities/link.entity';
import { Plan, PlanName } from 'src/modules/plan/entities/plan.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { Review } from 'src/modules/review/entities/review.entity';
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

  @ManyToOne(() => Plan, (plan) => plan.users)
  @JoinColumn({ name: 'plan', referencedColumnName: 'planName' })
  plan: Plan;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];

  @OneToMany(() => Contract, (contract) => contract.sender)
  contracts: Contract[];

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
