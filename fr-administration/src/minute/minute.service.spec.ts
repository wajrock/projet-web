import { Test, TestingModule } from '@nestjs/testing';
import { MinuteService } from './minute.service';
import { UsersService } from '../users/users.service';
import { Minute } from './minute.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MinuteService', () => {
  let service: MinuteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MinuteService,
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Minute),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MinuteService>(MinuteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
