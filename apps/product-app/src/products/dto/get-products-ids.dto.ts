import { ArrayMinSize, IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetProductsIdsDto {
  @IsNotEmpty()
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  idsProducts: ObjectId[];
}
