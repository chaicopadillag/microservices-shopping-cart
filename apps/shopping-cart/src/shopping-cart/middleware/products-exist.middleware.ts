import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { UpdateShoppingCartDto } from '../dto/update-shopping-cart.dto';
import { ProductServiceHelper } from '../helpers/product-service.helper';

@Injectable()
export class ProductsExistMiddleware implements NestMiddleware {
  constructor(private readonly productServiceHelper: ProductServiceHelper) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { products } = req.body as UpdateShoppingCartDto;

      if (products.length === 0) return next();

      const idsProducts = products.map((product) => product.idProduct);

      for (const id of idsProducts) {
        if (!isValidObjectId(id)) {
          return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            message: `Product id ${id} is not valid`,
          });
        }
      }

      const productsDb = await this.productServiceHelper.getProductsByIds(
        idsProducts,
      );

      if (productsDb.length !== products.length) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: 'One or more products not found',
        });
      }

      const productsExist = productsDb.every((product) =>
        products.some(
          (productToCheck) => productToCheck.idProduct === product._id,
        ),
      );

      if (!productsExist) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: 'One or more products not found',
        });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error in ProductExistMiddleware',
      });
    }
  }
}
