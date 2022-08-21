import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { isValidObjectId, Model } from 'mongoose';
import { UpdateShoppingCartDto } from '../dto/update-shopping-cart.dto';
import { ShoppingCart } from '../entities/shopping-cart.entity';
import { EShoppingCartStatus } from '../interfaces/shopping-cart.interface';

@Injectable()
export class ShoppingCartExistMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(ShoppingCart.name)
    private readonly shoppingCartModel: Model<ShoppingCart>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { idShoppingCart } = req.body as UpdateShoppingCartDto;

      if (!isValidObjectId(idShoppingCart)) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: `ShoppingCart id ${idShoppingCart} is not valid`,
        });
      }

      const shoppingCart = await this.shoppingCartModel.findById(
        idShoppingCart,
      );

      if (!shoppingCart) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Shopping cart not found',
        });
      }

      if (
        shoppingCart?.status_generate?.value ===
        EShoppingCartStatus.GENERATE_PURCHASE_ORDER
      ) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message:
            'Cart purchase order has already been generated and cannot be updated',
        });
      }

      next();
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error in ShoppingCartMiddleware',
      });
    }
  }
}
