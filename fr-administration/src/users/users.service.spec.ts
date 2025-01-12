import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { Minute } from '../minute/minute.entity';
import { Association } from '../associations/association.entity';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { MinuteService } from '../minute/minute.service';
import { AssociationsService } from '../associations/associations.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');  // Pour mocker bcrypt.hash

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let roleService: RoleService;
  let minuteService: MinuteService;
  let associationsService: AssociationsService;

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  const mockRoleService = {
    getByIdUser: jest.fn(),
    removeUserFromAllRoles: jest.fn(),
  };

  const mockMinuteService = {
    removeUserFromAllMinutes: jest.fn(),
  };

  const mockAssociationsService = {
    removeUserFromAllAssociations: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: RoleService,
          useValue: mockRoleService,
        },
        {
          provide: MinuteService,
          useValue: mockMinuteService,
        },
        {
          provide: AssociationsService,
          useValue: mockAssociationsService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roleService = module.get<RoleService>(RoleService);
    minuteService = module.get<MinuteService>(MinuteService);
    associationsService = module.get<AssociationsService>(AssociationsService);
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const newUser = new User('John', 'Doe', 30, 'password123');
      const hashPassword = 'hashedPassword';
  
      // Mock de la méthode hashPassword
      const hashPasswordMock = jest.fn().mockResolvedValue(hashPassword);
      service['hashPassword'] = hashPasswordMock;
  
      // Mock de la méthode create et save de userRepository
      jest.spyOn(userRepository, 'create').mockReturnValue(newUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);
  
      // Appel de la méthode create et vérification du résultat
      const result = await service.create('John', 'Doe', 30, 'password123');
      
      // Vérification que la méthode hashPassword a été appelée avec le bon mot de passe
      expect(hashPasswordMock).toHaveBeenCalledWith('password123');
  
      // Vérification du résultat
      expect(result).toEqual(newUser);
    });
  });
  

  describe('remove', () => {
    it('should delete a user and return true', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue({
        affected: 1,
        raw: [] // Simulating the deletion of one user
      });

      expect(await service.remove(1)).toBe(true);
    });

    it('should return false if no rows are affected', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue({
        affected: 0,
        raw: [] // Simulating the deletion failure (no rows affected)
      });

      expect(await service.remove(1)).toBe(false);
    });
  });

  describe('removeUserFromAll', () => {
    it('should remove user from all associations, roles, and minutes', async () => {
      const userId = 1;
      
      // Mocking the calls to services removing the user from associations, roles, and minutes
      jest.spyOn(minuteService, 'removeUserFromAllMinutes').mockResolvedValue();
      jest.spyOn(roleService, 'removeUserFromAllRoles').mockResolvedValue();
      jest.spyOn(associationsService, 'removeUserFromAllAssociations').mockResolvedValue();
      jest.spyOn(userRepository, 'delete').mockResolvedValue({
        affected: 1,
        raw: [] // Simulating the deletion of the user
      });

      const result = await service.removeUserFromAll(userId);
      expect(result).toBe(true);
      expect(minuteService.removeUserFromAllMinutes).toHaveBeenCalledWith(userId);
      expect(roleService.removeUserFromAllRoles).toHaveBeenCalledWith(userId);
      expect(associationsService.removeUserFromAllAssociations).toHaveBeenCalledWith(userId);
    });
  });
});
