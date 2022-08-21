import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';

export class UpdateShoppingCartDto extends PartialType(CreateShoppingCartDto) {
  @IsNotEmpty()
  @IsMongoId()
  idShoppingCart: string;
}
