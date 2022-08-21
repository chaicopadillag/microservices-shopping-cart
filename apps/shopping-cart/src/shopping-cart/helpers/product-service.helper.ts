import { Injectable } from '@nestjs/common';
import { Product } from 'apps/product-app/src/products/entities/product.entity';
import { AxiosAdapter } from '../../common/adapters/axios.adapter';

@Injectable()
export class ProductServiceHelper {
  hostUrl = 'http://localhost:3000/api';
  constructor(private readonly httClient: AxiosAdapter) {}

  async getProductsByIds(idProducts: string[]): Promise<Product[]> {
    const data = {
      idsProducts: idProducts,
    };

    const products = await this.httClient.get<Product[]>(
      `${this.hostUrl}/products/v1.0/get-products/ids`,
      { data },
    );

    return products;
  }
}
