import { Entity, PrimaryGeneratedColumn, Column, JoinTable } from 'typeorm';
import { Member } from './association.member';

@Entity()
export class AssociationDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinTable()
  members: Member[];

  @Column()
  name: string;

  @Column()
  logo: string;
}
