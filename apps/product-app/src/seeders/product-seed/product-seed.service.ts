import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { productSeed } from '../../database/seeds/product.seed';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class ProductSeedService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async seedProducts() {
    try {
      await this.productModel.deleteMany({});
      await this.productModel.create(productSeed);

      return {
        message: 'Products Seeding successfull',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Seeding failed');
    }
  }
}
