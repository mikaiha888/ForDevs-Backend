import { Project } from 'src/modules/project/entities/project.entity';
import {
  Column,
  Entity,
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
  projects: Project[];
}
