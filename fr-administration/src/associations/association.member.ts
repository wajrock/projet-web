import { Entity, Column, JoinTable } from 'typeorm';

@Entity()
export class Member {
  @JoinTable()
  id: number;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column()
  avatar: string;

  @Column()
  age: number;

  @Column()
  role: string;
}
