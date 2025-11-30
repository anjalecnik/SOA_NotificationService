import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Notification } from './notification.entity';

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn()
  id: number;

  // referenca na uporabnika iz Auth & Account servisa
  @Column({ type: 'uuid' })
  userId: string;

  @Column()
  message: string;

  @Column({ type: 'timestamptz' })
  remindAt: Date;

  @Column({ default: false })
  processed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
