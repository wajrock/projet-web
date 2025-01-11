import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';
import { AssociationsService } from 'src/associations/associations.service';
import { MinuteService } from 'src/minute/minute.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,
    @Inject(forwardRef(() => MinuteService))
    private readonly minutesService: MinuteService,
    @Inject(forwardRef(() => AssociationsService))
    private readonly associationsService: AssociationsService,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async getById(idToFind: number): Promise<User> {
    return await this.repository.findOne({ where: { id: idToFind } });
  }

  async getRoles(idUser: number): Promise<Role[]> {
    return await this.roleService.getByIdUser(idUser);
  }

  async create(
    firstname: string,
    lastname: string,
    age: number,
    password: string,
  ): Promise<User> {
    const saltOrRounds = 10;

    const hash = await bcrypt.hash(
      password ? password : 'default',
      saltOrRounds,
    );

    const newUser = await this.repository.create({
      lastname: lastname,
      firstname: firstname,
      age: age,
      password: hash,
    });

    return await this.repository.save(newUser);
  }

  async update(
    firstname: string,
    lastname: string,
    age: number,
    password: string,
    id: number,
  ): Promise<User> {
    const user = await this.getById(id);

    if (firstname !== undefined) {
      user.firstname = firstname;
    }

    if (lastname !== undefined) {
      user.lastname = lastname;
    }

    if (age !== undefined) {
      user.age = age;
    }

    if (password !== undefined) {
      const saltOrRounds = 10;

      const hash = await bcrypt.hash(password, saltOrRounds);
      user.password = hash;
    }

    return this.repository.save(user);
  }

  async remove(id: number): Promise<boolean> {
    return await this.repository.delete(id).then((row) => row.affected === 1);
  }

  async removeUserFromAll(idUser: number): Promise<boolean> {
    await this.minutesService.removeUserFromAllMinutes(idUser);
    await this.roleService.removeUserFromAllRoles(idUser);
    await this.associationsService.removeUserFromAllAssociations(idUser);
    return this.remove(idUser);
  }
}
