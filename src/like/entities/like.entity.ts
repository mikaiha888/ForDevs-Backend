import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  projectId: string;

}
