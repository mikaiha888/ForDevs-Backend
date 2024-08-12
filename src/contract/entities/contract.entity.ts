import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity'; 

@Entity()
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column({ type: 'uuid' })
  senderId: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @Column({ type: 'uuid' })
  receiverId: string;

  @Column({ length: 255, default: 'Contrato para proyecto' })
  subject: string;

  @Column({ type: 'text', default: 'Descripción del proyecto' })
  projectDescription: string;

  @Column({ type: 'float', default: 1.0 })
  budget: number;

  @Column({  length: 10, default: 'ARS' })
  currency: string;

  @Column({ length: 50, default: 'Ahora' })
  availableTime: string;

  @Column({
    type: 'enum',
    enum: ['rejected', 'pending', 'accepted'],
    default: 'pending',
  })
  status: 'rejected' | 'pending' | 'accepted';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date; 
}
