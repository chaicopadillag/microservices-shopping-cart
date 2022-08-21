import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { CreatePurchaseOrderDto } from '../dto/create-purchase-order.dto';
import { ShoppingCartServiceHelper } from '../helpers/shopping-cart-service.helper';
import { UserServiceHelper } from '../helpers/user-service.helper';

@Injectable()
export class ShoppingCartPurchaseOrderMiddleware implements NestMiddleware {
  constructor(
    private readonly shoppingCartService: ShoppingCartServiceHelper,
    private readonly userService: UserServiceHelper,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { idShoppingCart, idUser } = req.body as CreatePurchaseOrderDto;

      const errors = [];

      if (!isValidObjectId(idShoppingCart)) {
        errors.push({
          field: 'idShoppingCart',
          message: `Invalid shopping ${idShoppingCart}`,
        });
      }

      if (!isValidObjectId(idUser)) {
        errors.push({
          field: 'idUser',
          message: `Invalid user ${idUser}`,
        });
      }

      if (errors.length > 0) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          errors,
        });
      }

      const user = await this.userService.getUserById(idUser);

      if (!user) {
        errors.push({
          field: 'idUser',
          message: `User ${idUser} not found`,
        });
      }

      const shoppingCart =
        await this.shoppingCartService.getShoppingCartByIdAndUser(
          idShoppingCart,
          idUser,
        );

      if (!shoppingCart) {
        errors.push({
          field: 'idShoppingCart',
          message: `Shopping cart ${idShoppingCart} not found`,
        });
      }

      if (shoppingCart?.products.length === 0) {
        errors.push({
          field: 'idShoppingCart',
          message: `Shopping cart ${idShoppingCart} is empty`,
        });
      }

      if (errors.length > 0) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          errors,
        });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error in ShoppingCartPurchaseOrderMiddleware',
      });
    }
  }
}
