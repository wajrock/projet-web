import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RoleService } from '../role/role.service';
import { Role } from '../role/role.entity';
import { MinuteService } from '../minute/minute.service';
import { AssociationsService } from '../associations/associations.service';

// Définition d'un type générique Mock pour les services
export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

// Fonction pour créer un mock de Repository générique
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
  }),
);

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let roleService: RoleService; // Pas de type jest.Mocked ici, juste RoleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: RoleService, // Mock explicite de RoleService
          useValue: {
            getByIdUser: jest.fn(), // Mock explicite
          },
        },
        {
          provide: MinuteService, // Mock explicite de RoleService
          useFactory: repositoryMockFactory,
        },
        {
          provide: AssociationsService, // Mock explicite de RoleService
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory, // Utilisation du mock pour le repository User
        },
        {
          provide: getRepositoryToken(Role),
          useFactory: repositoryMockFactory, // Utilisation du mock pour le repository Role
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    roleService = module.get<RoleService>(RoleService); // Récupération de l'instance du mock
    controller = module.get<UsersController>(UsersController);
  });

  describe('getRoles', () => {
    it('should return roles for a given user ID', async () => {
      const roles: Role[] = [
        { idUser: 1, idAssociation: 100, name: 'Admin' },
        { idUser: 1, idAssociation: 101, name: 'User' },
      ];

      // Moquage explicite de getByIdUser
      jest.spyOn(roleService, 'getByIdUser').mockResolvedValue(roles);
      jest.spyOn(service, 'getById').mockResolvedValue({ id: 1 } as User);

      const result = await controller.getRoles({ id: 1 });
      expect(result).toBe(roles);
    });

    it('should throw a NOT_FOUND exception if user does not exist', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(undefined);

      await expect(controller.getRoles({ id: 999 })).rejects.toThrowError(
        new HttpException(
          'Could not find a user with the id 999',
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    it('should throw a BAD_REQUEST exception if roleService.getByIdUser fails', async () => {
      const error = new Error('Role service failed');
      jest.spyOn(service, 'getById').mockResolvedValue({ id: 1 } as User);
      jest.spyOn(roleService, 'getByIdUser').mockRejectedValue(error);

      await expect(controller.getRoles({ id: 1 })).rejects.toThrowError(
        new HttpException('Role service failed', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('getById', () => {
    it('should return a user if found', async () => {
      const user = { id: 1, name: 'John Doe' };
      jest.spyOn(service, 'getById').mockResolvedValue(user as unknown as User);

      const result = await controller.getById({ id: 1 });
      expect(result).toBe(user);
    });

    it('should throw a NOT_FOUND exception if user does not exist', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(undefined);

      await expect(controller.getById({ id: 999 })).rejects.toThrowError(
        new HttpException(
          'Could not find a user with the id 999',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
