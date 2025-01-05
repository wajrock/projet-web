import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

  @Column()
  public age: number;

  @Column()
  @Exclude()
  public password: string;

  @Column()
  public avatar: string;

  constructor(
    firstname: string,
    lastname: string,
    age: number,
    password: string,
  ) {
    this.id = undefined;
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.password = password;
  }
}
