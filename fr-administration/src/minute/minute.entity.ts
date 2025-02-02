import {
  Entity,
  Column,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Association } from '../associations/association.entity';
import { User } from '../users/user.entity';
@Entity()
export class Minute {
  @PrimaryGeneratedColumn()
  idMinute: number;

  @ManyToMany(() => User)
  @JoinTable()
  voters: User[];

  @Column()
  date: string;

  @ManyToOne(() => Association)
  idAssociation: number;

  @Column()
  content: string;

  constructor() {}
}
