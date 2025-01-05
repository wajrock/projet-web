import { Injectable } from '@nestjs/common';
import { Association } from './association.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { AssociationDTO } from './associations.dto';
import { MinuteService } from 'src/minute/minute.service';
import { Minute } from 'src/minute/minute.entity';
import { Member } from './association.member';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AssociationsService {
  constructor(
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
      avatar: user.avatar,
      firstname: user.firstname,
      age: user.age,
      role: (await this.roleService.getById(user.id, idAssociation)).name,
    };
  }

  private async toDTO(association: Association): Promise<AssociationDTO> {
    const members = await Promise.all(
      association.users.map((user) => this.toMember(user, association.id)),
    );

    const toDTO: AssociationDTO = {
      id: association.id,
      name: association.name,
      logo: association.logo,
      members: members,
    };

    return toDTO;
  }

  async getAll(): Promise<AssociationDTO[]> {
    const associations = await this.repository.find({ relations: ['users'] });
    console.log(associations[0]);
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

  async create(
    idUsers: number[],
    name: string,
    logo: string,
  ): Promise<Association> {
    const users: User[] = await Promise.all(
      idUsers.map((id) => this.service.getById(+id)),
    );

    const newAssociation = await this.repository.create({
      name: name,
      logo: logo,
    });

    newAssociation.users = users;

    return await this.repository.save(newAssociation);
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
}
