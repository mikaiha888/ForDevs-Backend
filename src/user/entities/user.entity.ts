import { Project } from 'src/project/entities/project.entity';
import { Review } from 'src/review/entities/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  image: string;

  @Column()
  bio: string;

  @Column()
  aboutMe: string;

  @Column()
  coveryImage: string;

  //Relation @OneToMany()
  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  // Relation to Reviews
  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];
}
