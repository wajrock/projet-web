import { Test, TestingModule } from '@nestjs/testing';
import { AssociationsService } from './associations.service';
import { Association } from './association.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MinuteService } from '../minute/minute.service';
import { RoleService } from '../role/role.service';
import { UsersService } from '../users/users.service';

describe('AssociationsService', () => {
  let service: AssociationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssociationsService,
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: MinuteService,
          useValue: {},
        },
        {
          provide: RoleService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Association),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AssociationsService>(AssociationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
