import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { UpdateShoppingCartDto } from '../dto/update-shopping-cart.dto';
import { UserServiceHelper } from '../helpers/user-service.helper';

@Injectable()
export class UserExistMiddleware implements NestMiddleware {
  constructor(private readonly userServiceHelper: UserServiceHelper) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { idUser } = req.body as UpdateShoppingCartDto;

      if (!isValidObjectId(idUser)) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: `User id ${idUser} is not valid`,
        });
      }

      const userExist = await this.userServiceHelper.getUserById(idUser);

      if (!userExist) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'User not found',
        });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error in UserExistMiddleware',
      });
    }
  }
}
