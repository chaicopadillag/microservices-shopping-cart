import { Type } from 'class-transformer';
import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateShoppingCartDto {
  @IsOptional()
  @IsString()
  shoppingNumber: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductShoppingCartDto)
  products: ProductShoppingCartDto[];

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  idUser: string;
}

class ProductShoppingCartDto {
  @IsNotEmpty()
  @IsMongoId()
  idProduct: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Min(1)
  quantity: number;
}
