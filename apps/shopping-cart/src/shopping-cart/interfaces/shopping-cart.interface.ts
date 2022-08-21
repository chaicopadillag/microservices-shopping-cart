import { IAuditoriaDb } from '../../common/interfaces/auditoriadb.interface';

export interface IShoppingCart {
  shoppingNumber: string;
  products: IProductCart[];
  status_create: IShoppingCartStatus;
  status_update?: IShoppingCartStatus;
  status_generate?: IShoppingCartStatus;
  auditProperties: IAuditoriaDb;
}

export interface IProductCart {
  idProduct: string;
  description: string;
  url: string;
  price: number;
  quantity: number;
}

export interface IShoppingCartStatus {
  value: number;
  description: string;
}

export enum EShoppingCartStatus {
  CREATE_SHOPPING_CART = 1,
  UPDATE_PRODUCTS = 2,
  GENERATE_PURCHASE_ORDER = 3,
}
