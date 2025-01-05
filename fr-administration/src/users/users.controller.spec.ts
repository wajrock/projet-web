import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
  }),
);

describe('UsersController', () => {
  let controller: UsersController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  describe('first', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const expected = Promise.all([
        {
          id: 0,
          firstname: 'John',
          lastname: 'Doe',
          age: 23,
          password: '',
        },
      ]);
      jest.spyOn(service, 'getAll').mockImplementation(() => expected);
      expect(await controller.getAll()).toBe(await expected);
    });
  });

  describe('getById', () => {
    it('should return a single user, with the provided id', async () => {
      const expected = await Promise.all([
        {
          id: 0,
          firstname: 'John',
          lastname: 'Doe',
          age: 23,
          password: '',
        },
      ]);
      jest.spyOn(service, 'getById').mockImplementation((id) => {
        return Promise.resolve(expected.find((user) => user.id === id));
      });
      expect(await controller.getById({ id: 0 })).toBe(expected[0]);
    });
  });
});
