import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetProductsIdsDto } from './dto/get-products-ids.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async getProucts(): Promise<Product[]> {
    return await this.productModel.find({
      'auditProperties.activeRecord': true,
    });
  }

  async getProductById(idProduct: string): Promise<Product> {
    const product = await this.productModel.findOne({
      _id: idProduct,
      'auditProperties.activeRecord': true,
    });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async getProductsByIds(
    getProductsIdsDto: GetProductsIdsDto,
  ): Promise<Product[]> {
    const { idsProducts } = getProductsIdsDto;

    return await this.productModel.find({
      'auditProperties.activeRecord': true,
      _id: { $in: idsProducts },
    });
  }
}
