import { Injectable } from '@nestjs/common';
import { ShoppingCart } from 'apps/shopping-cart/src/shopping-cart/entities/shopping-cart.entity';
import { AxiosAdapter } from '../../common/adapters/axios.adapter';

@Injectable()
export class ShoppingCartServiceHelper {
  hostUrl = 'http://localhost:5000/api';
  constructor(private readonly httClient: AxiosAdapter) {}

  async getShoppingCartByIdAndUser(
    idShoppingCart: string,
    idUser: string,
  ): Promise<ShoppingCart> {
    const shoppingCart = await this.httClient.get<ShoppingCart>(
      `${this.hostUrl}/shopping-cart/v1.0/${idUser}/${idShoppingCart}`,
    );

    return shoppingCart;
  }

  async updateShoppingCartStatusGenerateOrder(
    idShoppingCart: string,
  ): Promise<ShoppingCart> {
    const shoppingCart = await this.httClient.patch<ShoppingCart>(
      `${this.hostUrl}/shopping-cart/v1.0/update-status-generate-order/${idShoppingCart}`,
    );
    return shoppingCart;
  }
}
