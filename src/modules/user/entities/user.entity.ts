import { Link } from 'src/modules/link/entities/link.entity';
import { Plan } from 'src/modules/plan/entities/plan.entity';
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];

  @ManyToOne(() => Plan, (plan) => plan.users)
  plan: Link[];
}
