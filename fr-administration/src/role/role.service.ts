import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Role } from './role.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
@Injectable()
export class RoleService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) {}

  async getAll(): Promise<Role[]> {
    return await this.repository.find();
  }

  async getById(idUser: number, idAssociation: number): Promise<Role> {
    return await this.repository.findOne({
      where: { idUser: Equal(idUser), idAssociation: Equal(idAssociation) },
    });
  }

  async getByIdUser(idUser: number): Promise<Role[]> {
    return await this.repository.find({
      where: { idUser: Equal(idUser) },
    });
  }

  async getByRoleName(roleName: string): Promise<User[]> {
    const roles = await this.repository.find({
      where: { name: Equal(roleName) },
    });
    return Promise.all(
      roles.map((role) => this.userService.getById(role.idUser)),
    );
  }

  async create(
    idUser: number,
    idAssociation: number,
    name: string,
  ): Promise<Role> {
    const newRole = await this.repository.create({
      idUser: idUser,
      idAssociation: idAssociation,
      name: name,
    });

    return await this.repository.save(newRole);
  }

  async update(
    idUser: number,
    idAssociation: number,
    name: string,
  ): Promise<Role> {
    const role = await this.getById(idUser, idAssociation);
    if (name !== undefined) {
      role.name = name;
    }
    return await this.repository.save(role);
  }

  async remove(idUser: number, idAssociation: number): Promise<boolean> {
    return await this.repository
      .delete({ idUser, idAssociation })
      .then((association) => association.affected === 1);
  }

  async removeUserFromAllRoles(idUser: number): Promise<void> {
    await this.repository.delete({ idUser: idUser });
  }
}
