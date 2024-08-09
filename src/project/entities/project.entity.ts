import { Tag } from 'src/tag/entities/tag.entity';
import { Technology } from 'src/technology/entities/technology.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('projects')
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

  @ManyToMany(() => Tag, (tag) => tag.projects)
  tags: Tag[];

  @ManyToMany(() => Technology, (technology) => technology.projects)
  technologies: Technology[];
}
