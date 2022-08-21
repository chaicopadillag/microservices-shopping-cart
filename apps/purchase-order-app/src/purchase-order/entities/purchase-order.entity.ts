import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAuditoriaDb } from 'apps/product-app/src/common/interfaces/auditoriadb.interface';
import { IProductCart } from 'apps/shopping-cart/src/shopping-cart/interfaces/shopping-cart.interface';
import { Document } from 'mongoose';
import { IStatusPurchaseOrder } from '../interfaces/purchase-order.interface';

@Schema({ collection: 'purchase_orders' })
export class PurchaseOrder extends Document {
  @Prop({ type: String, required: true, unique: true, index: true })
  orderNumber: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  shoppingNumber: string;

  @Prop({ type: Date, required: true })
  deliveryDate: Date;

  @Prop({ type: Array, required: true })
  products: IProductCart[];

  @Prop({ type: Object, required: true })
  status: IStatusPurchaseOrder;

  @Prop({ type: Object, required: true })
  auditProperties: IAuditoriaDb;
}

export const PurchaseOrderSchema = SchemaFactory.createForClass(PurchaseOrder);
