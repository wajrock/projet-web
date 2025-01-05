import { Association } from 'src/associations/association.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
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
