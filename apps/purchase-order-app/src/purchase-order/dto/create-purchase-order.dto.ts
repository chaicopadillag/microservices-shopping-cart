import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  idShoppingCart: string;

  @IsNotEmpty()
  @IsMongoId()
  idUser: string;

  @IsNotEmpty()
  @IsDateString()
  deliveryDate: string;
}
