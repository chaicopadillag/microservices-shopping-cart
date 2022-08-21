import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAuditoriaDb } from '../../common/interfaces/auditoriadb.interface';
import { IUserStatus } from '../interfaces/product.interface';

@Schema({ collection: 'products' })
export class Product extends Document {
  @Prop({ type: String, required: true, unique: true, index: true })
  code: string;

  @Prop({ type: String, required: true, index: true })
  name: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Object, required: true })
  status: IUserStatus;

  @Prop({ type: Object, required: true })
  auditProperties: IAuditoriaDb;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
