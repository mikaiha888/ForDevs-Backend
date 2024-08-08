import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Contract } from '../../contract/entities/contract.entity'; 

@Entity()
export class Commission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  rate: number;

  @Column({ type: 'float' })
  amount: number;

  @ManyToOne(() => Contract, { nullable: false })
  @JoinColumn({ name: 'contractId' })
  contract: Contract;

  @Column({ type: 'uuid' })
  contractId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date; 
}
