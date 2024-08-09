import { IsEmail, IsOptional, IsUrl, Length } from 'class-validator';
import { Project } from 'src/project/entities/project.entity';
import { Review } from 'src/review/entities/review.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Length(1, 30, { message: 'First name must be between 1 and 30 characters' })
  firstName: string;

  @Column({ nullable: false })
  @Length(1, 30, { message: 'Last name must be between 1 and 30 characters' })
  lastName: string;

  @Column({ nullable: false, unique: true, length: 255 })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @Column({ nullable: false })
  @Length(6, 30, { message: 'Password must be between 6 and 30 characters' })
  password: string;

  @Column({ nullable: true, length: 300, default: '' })
  bio: string;

  @Column({ nullable: true, length: 5000, default: '' })
  aboutMe: string;

  @Column({ nullable: true, default: '' })
  @IsUrl({}, { message: 'Image must be a valid URL' })
  image: string;

  @Column({ nullable: true, default: '' })
  @IsUrl({}, { message: 'Cover image must be a valid URL' })
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
}
