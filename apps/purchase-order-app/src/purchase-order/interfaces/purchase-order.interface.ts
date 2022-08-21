import { IAuditoriaDb } from 'apps/product-app/src/common/interfaces/auditoriadb.interface';
import { IProductCart } from 'apps/shopping-cart/src/shopping-cart/interfaces/shopping-cart.interface';

export interface IPurchaseOrder {
  orderNumber: string;
  shoppingNumber: string;
  deliveryDate: string;
  products: IProductCart[];
  status: IStatusPurchaseOrder;
  auditProperties: IAuditoriaDb;
}

export interface IStatusPurchaseOrder {
  value: number;
  description: string;
}
