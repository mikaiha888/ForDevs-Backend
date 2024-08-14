import { Project } from 'src/project/entities/project.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 30 })
  name: string;

  @ManyToMany(() => Project, (project) => project.tags)
  @JoinColumn({ name: 'projects' })
  projects: Project[];
}
