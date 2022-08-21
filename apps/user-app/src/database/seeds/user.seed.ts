import { IUser } from '../../users/interfaces/user.interface';

export const userSeed: IUser[] = [
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
      dateUpdate: null,
      userCreate: {} as any,
      userUpdate: null,
      activeRecord: true,
    },
  },
  {
    _id: '62ffb332f4e965f3aab1a6eb',
    email: 'justen_quitzon@yahoo.com',
    firstName: 'Annabelle',
    lastName: 'Kreiger',
    status: {
      value: 1,
      description: 'Creado por base de datos',
    },
    auditProperties: {
      dateCreate: new Date(),
      dateUpdate: null,
      userCreate: {},
      userUpdate: null,
      activeRecord: true,
    },
  },
  {
    _id: '62ffb332f4e965f3aab1a6ec',
    email: 'chaz_nader@gmail.com',
    firstName: 'Timothy',
    lastName: 'Mitchell',
    status: {
      value: 1,
      description: 'Creado por base de datos',
    },
    auditProperties: {
      dateCreate: new Date(),
      dateUpdate: null,
      userCreate: {},
      userUpdate: null,
      activeRecord: true,
    },
  },
];
