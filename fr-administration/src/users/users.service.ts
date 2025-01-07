import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
// import { AssociationDTO } from 'src/associations/associations.dto';
import { Role } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,
    // private readonly associationService: AssociationsService,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async getById(idToFind: number): Promise<User> {
    return await this.repository.findOne({ where: { id: Equal(idToFind) } });
  }

  async getRoles(idUser: number): Promise<Role[]> {
    return await this.roleService.getByIdUser(idUser);
  }

  async create(
    firstname: string,
    lastname: string,
    age: number,
    password: string,
    avatar: string,
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
      avatar: avatar,
    });

    return await this.repository.save(newUser);
  }

  async update(
    firstname: string,
    lastname: string,
    age: number,
    password: string,
    id: number,
    avatar: string,
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

    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    return this.repository.save(user);
  }

  async remove(id: number): Promise<boolean> {
    return await this.repository.delete(id).then((row) => row.affected === 1);
  }
}
