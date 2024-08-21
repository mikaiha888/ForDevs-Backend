import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ length: 255, default: 'Contrato para proyecto' })
  subject: string;
  
  @Column({ type: 'text', default: 'Descripción del proyecto' })
  projectDescription: string;
  
  @Column({ type: 'float', default: 1.0 })
  budget: number;
  
  @Column({ length: 10, default: 'ARS' })
  currency: string;
  
  @Column({ length: 50, default: 'Ahora' })
  availableTime: string;
  
  @Column({
    type: 'enum',
    enum: ['rejected', 'pending', 'accepted'],
    default: 'pending',
  })
  status: 'rejected' | 'pending' | 'accepted';

  @ManyToOne(() => User, (user) => user.contracts)
  @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
  sender: User;

  @ManyToOne(() => User, (user) => user.contracts)
  @JoinColumn({ name: 'receiver_id', referencedColumnName: 'id' })
  receiver: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
