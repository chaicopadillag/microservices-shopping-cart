import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAuditoriaDb } from '../../common/interfaces/auditoriadb.interface';
import {
  IProductCart,
  IShoppingCartStatus,
} from '../interfaces/shopping-cart.interface';

@Schema({ collection: 'shopping_carts' })
export class ShoppingCart extends Document {
  @Prop({ type: String, required: true, unique: true, index: true })
  shoppingNumber: string;

  @Prop({ type: Array, required: true })
  products: IProductCart[];

  @Prop({ type: Object, required: true })
  status_create: IShoppingCartStatus;

  @Prop({ type: Object, required: false })
  status_update?: IShoppingCartStatus;

  @Prop({ type: Object, required: false })
  status_generate?: IShoppingCartStatus;

  @Prop({ type: Object, required: true })
  auditProperties: IAuditoriaDb;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
