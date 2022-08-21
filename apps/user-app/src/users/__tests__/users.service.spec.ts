import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [UsersService],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(jest.fn())
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    const users: User[] = [
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
          dateCreate: new Date(),
          activeRecord: true,
          userCreate: {
            idUser: '62ffb332f4e965f3aab1a6ea',
            email: 'hilbert21@gmail.com',
          },
        },
      },
    ] as any;

    jest
      .spyOn(service, 'getUsers')
      .mockImplementation(() => Promise.resolve(users));
    expect(await service.getUsers()).toBe(users);
  });

  it('should return an user', async () => {
    const user: User = {
      _id: '62ffb332f4e965f3aab1a6ea',
      email: 'kaitlyn27@hotmail.com',
      firstName: 'Kaitlyn',
      lastName: 'Heathcote',
      status: {
        value: 1,
        description: 'Creado por base de datos',
      },
      auditProperties: {
        dateCreate: new Date(),
        activeRecord: true,
        userCreate: {
          idUser: '62ffb332f4e965f3aab1a6ea',
          email: 'jessika29@gmail.com',
        },
      },
    } as any;

    jest
      .spyOn(service, 'getUserById')
      .mockImplementation(() => Promise.resolve(user));

    const result = await service.getUserById('62ffb332f4e965f3aab1a6ea');
    expect(result).toBe(user);
  });
});
