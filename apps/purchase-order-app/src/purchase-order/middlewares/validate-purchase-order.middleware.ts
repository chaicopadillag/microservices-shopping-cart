import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { CreatePurchaseOrderDto } from '../dto/create-purchase-order.dto';
import { ShoppingCartServiceHelper } from '../helpers/shopping-cart-service.helper';

@Injectable()
export class PurchaseOrderMiddleware implements NestMiddleware {
  constructor(
    private readonly shoppingCartService: ShoppingCartServiceHelper,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { idShoppingCart, idUser } = req.body as CreatePurchaseOrderDto;

      const errors = [];

      const shoppingCart =
        await this.shoppingCartService.getShoppingCartByIdAndUser(
          idShoppingCart,
          idUser,
        );

      if (shoppingCart && shoppingCart?.status_generate?.value === 3) {
        errors.push({
          field: 'idShoppingCart',
          message: `The shopping cart ${shoppingCart.shoppingNumber} already has a purchase order generated`,
        });
      }

      if (errors.length > 0) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          errors,
        });
      }

      next();
    } catch (error) {
      console.log('error mddw order', error);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error in middleware ShoppingCartExistMiddleware',
      });
    }
  }
}
