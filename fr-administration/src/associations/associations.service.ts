import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Association } from './association.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { Minute } from '../minute/minute.entity';
import { MinuteService } from '../minute/minute.service';
import { Role } from '../role/role.entity';
import { RoleService } from '../role/role.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Member } from './association.member';
import { AssociationDTO } from './associations.dto';

@Injectable()
export class AssociationsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly service: UsersService,
    private readonly minutesService: MinuteService,
    private readonly roleService: RoleService,
    @InjectRepository(Association)
    private repository: Repository<Association>,
  ) {}

  private async toMember(user: User, idAssociation: number): Promise<Member> {
    return {
      id: user.id,
      lastname: user.lastname,
      firstname: user.firstname,
      age: user.age,
      role:
        (await this.roleService.getById(user.id, idAssociation))?.name ||
        'member',
    };
  }

  private async toDTO(association: Association): Promise<AssociationDTO> {
    const members = await Promise.all(
      association.users.map((user) => this.toMember(user, association.id)),
    );

    const toDTO: AssociationDTO = {
      id: association.id,
      name: association.name,
      members: members,
    };

    return toDTO;
  }

  async getAll(): Promise<AssociationDTO[]> {
    const associations = await this.repository.find({ relations: ['users'] });
    return Promise.all(
      associations.map((association) => this.toDTO(association)),
    );
  }

  async getById(idToFind: number): Promise<AssociationDTO> {
    const association = await this.repository.findOne({
      where: { id: Equal(idToFind) },
      relations: ['users'],
    });
    return this.toDTO(association);
  }

  async getByUser(idUser: number): Promise<AssociationDTO[]> {
    const associations: AssociationDTO[] = await this.getAll();
    const associationsUser: AssociationDTO[] = [];

    for (let index = 0; index < associations.length; index++) {
      const association = associations[index];
      const membersAssociation: Member[] = await association.members;
      for (let index = 0; index < membersAssociation.length; index++) {
        const member = membersAssociation[index];
        if (member.id === idUser) {
          associationsUser.push(association);
        }
      }
    }
    return associationsUser;
  }

  async getMembers(idAssociation: number): Promise<Member[]> {
    return (await this.getById(idAssociation)).members;
  }

  async getMinutes(idAssociation: number): Promise<Minute[]> {
    return this.minutesService.getByIdAssociation(idAssociation);
  }

  async createWithPresident(
    idUsers: number[],
    name: string,
    idCreator?: number,
  ): Promise<Role> {
    const newAssociation: Association = await this.create(idUsers, name);
    return this.roleService.create(idCreator, newAssociation.id, 'president');
  }

  async create(idUsers: number[], name: string): Promise<Association> {
    const users: User[] = await Promise.all(
      idUsers.map((id) => this.service.getById(+id)),
    );

    const newAssociation = await this.repository.create({
      name: name,
    });

    newAssociation.users = users;

    return await this.repository.save(newAssociation);
  }

  async addMember(idAssociation: number, idUser: number): Promise<Role> {
    const newMember: User = await this.service.getById(idUser);

    const association: Association = await this.repository.findOne({
      where: { id: Equal(idAssociation) },
      relations: ['users'],
    });
    association.users.push(newMember);
    await this.repository.save(association);

    return await this.roleService.create(idUser, idAssociation, 'member');
  }

  async update(
    id: number,
    idUsers: number[],
    name: string,
  ): Promise<AssociationDTO> {
    const association = await this.getById(id);

    if (idUsers !== undefined) {
      const newUsers = await Promise.all(
        idUsers.map((idUser) => this.service.getById(idUser)),
      );

      const members: Member[] = await Promise.all(
        newUsers.map(async (user) => {
          return await this.toMember(user, id); // Appel asynchrone pour chaque utilisateur
        }),
      );

      association.members = members;
    }

    if (name !== undefined) {
      association.name = name;
    }

    return await this.repository.save(association);
  }

  async remove(id: number): Promise<boolean> {
    return await this.repository
      .delete(id)
      .then((association) => association.affected === 1);
  }

  async removeMember(
    idAssociation: number,
    idUser: number,
  ): Promise<Association> {
    this.roleService.remove(idUser, idAssociation);
    const association: Association = await this.repository.findOne({
      where: { id: Equal(idAssociation) },
      relations: ['users'],
    });

    association.users = association.users.filter((user) => user.id !== idUser);

    return await this.repository.save(association);
  }

  async removeUserFromAllAssociations(idUser: number): Promise<void> {
    const associations = await this.repository.find({
      relations: ['users'],
    });

    for (const association of associations) {
      association.users = association.users.filter(
        (user) => user.id !== idUser,
      );
      await this.repository.save(association);
    }
  }
}
