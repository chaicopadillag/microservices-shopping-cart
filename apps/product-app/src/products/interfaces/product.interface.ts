import { IAuditoriaDb } from '../../common/interfaces/auditoriadb.interface';

export interface IProduct {
  _id?: string;
  code: string;
  name: string;
  url: string;
  description: string;
  price: number;
  status: IUserStatus;
  auditProperties: IAuditoriaDb;
}

export interface IUserStatus {
  value: number;
  description: string;
}
