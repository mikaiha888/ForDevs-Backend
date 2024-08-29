import { Tag } from 'src/modules/utility/tag/entities/tag.entity';
import { Technology } from 'src/modules/auxiliary/technology/entities/technology.entity';
import { User } from 'src/modules/core/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column({ type: 'varchar', length: 512, default: 'image_notfound.jpg' })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.projects, { eager: true })
  @JoinTable({ name: 'project_tags' })
  tags: Tag[];

  @ManyToMany(() => Technology, (technology) => technology.projects, {
    eager: true,
  })
  @JoinTable({ name: 'project_technologies' })
  technologies: Technology[];
}
