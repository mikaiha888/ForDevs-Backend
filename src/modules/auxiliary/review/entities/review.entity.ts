import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { User } from 'src/modules/core/user/entities/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'reviewer_id', referencedColumnName: 'id' })
  reviewer: User;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'reviewedUser_id', referencedColumnName: 'id' })
  reviewedUser: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

}
