import { Entity, Column, JoinTable, PrimaryColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryColumn()
  @JoinTable()
  idUser: number;

  @PrimaryColumn()
  @JoinTable()
  idAssociation: number;

  @Column()
  name: string;

  constructor() {}
}
