import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IAuditoriaDb } from '../../../../shopping-cart/src/common/interfaces/auditoriadb.interface';
import { IUserStatus } from '../interfaces/user.interface';

@Schema({ collection: 'users' })
export class User extends Document {
  @Prop({ type: String, required: true, index: true })
  email: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: Object, required: true })
  status: IUserStatus;

  @Prop({ type: Object, required: true })
  auditProperties: IAuditoriaDb;
}

export const UserSchema = SchemaFactory.createForClass(User);
