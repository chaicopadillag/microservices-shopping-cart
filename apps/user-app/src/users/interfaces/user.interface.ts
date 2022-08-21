import { IAuditoriaDb } from '../../../../shopping-cart/src/common/interfaces/auditoriadb.interface';

export interface IUser {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  status: IUserStatus;
  auditProperties: IAuditoriaDb;
}

export interface IUserStatus {
  value: number;
  description: string;
}
