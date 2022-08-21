import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UsersController } from '../users.controller';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(jest.fn())
      .compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  describe('Test getUser', () => {
    it('Debe de retornar un array de tipo User', async () => {
      jest.spyOn(userService, 'getUsers').mockImplementation(() =>
        Promise.resolve([
          {
            _id: '62ffb332f4e965f3aab1a6ea',
            email: 'golda_haag@hotmail.com',
            firstName: 'Meghan',
            lastName: 'Heathcote',
            status: {
              value: 1,
              description: 'Creado por base de datos',
            },
            auditProperties: {
              dateCreate: '1661005189887',
              activeRecord: true,
            },
          },
        ] as any as Promise<User[]>),
      );
      const result = await userController.getUsers();

      expect(result).toHaveLength(1);

      expect(result[0]).toHaveProperty('_id');
      expect(result[0]).toHaveProperty('email');
      expect(result[0]).toHaveProperty('firstName');
      expect(result[0]).toHaveProperty('lastName');
      expect(result[0]).toHaveProperty('status');
      expect(result[0]).toHaveProperty('auditProperties');

      expect(userService.getUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test getUserById', () => {
    it('Debe de retornar un objeto de tipo User', async () => {
      jest.spyOn(userService, 'getUserById').mockImplementation(() =>
        Promise.resolve({
          _id: '62ffb332f4e965f3aab1a6ea',
          email: 'golda_haag@hotmail.com',
          firstName: 'Meghan',
          lastName: 'Heathcote',
          status: {
            value: 1,
            description: 'Creado por base de datos',
          },
          auditProperties: {
            dateCreate: '1661005189887',
            activeRecord: true,
          },
        } as any as Promise<User>),
      );

      const result = await userController.getUserById(
        '62ffb332f4e965f3aab1a6ea',
      );

      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('firstName');
      expect(result).toHaveProperty('lastName');
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('auditProperties');

      expect(userService.getUserById).toHaveBeenCalledTimes(1);
    });
  });
});
