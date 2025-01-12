import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
  };
  
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
  }));
  

describe('UsersService', () => {
  let service: UsersService;
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, { provide: getRepositoryToken(User), useFactory: repositoryMockFactory}],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
