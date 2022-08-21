import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'apps/user-app/src/users/entities/user.entity';
import { Model } from 'mongoose';
import { ShoppingCart } from '../entities/shopping-cart.entity';

@Injectable()
export class ShoppingCartHelper {
  constructor(
    @InjectModel(ShoppingCart.name)
    private readonly shoppingCartModel: Model<ShoppingCart>,
  ) {}

  async generateShoppingCartNumber(
    idUser: string,
    prefixUser: string,
  ): Promise<string> {
    try {
      const totalShoppingCarts = await this.shoppingCartModel
        .findOne({ 'auditProperties.userCreate.idUser': idUser })
        .countDocuments();

      const nextNumber = `000${totalShoppingCarts + 1}`.slice(-4);

      return `SH_${prefixUser}${nextNumber}`.toLocaleUpperCase();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al generar el número de carro de compra',
      );
    }
  }

  generatePrefix(firstName: string, email: string) {
    const lastLetter = email.split('@')[0].slice(-1);

    const userPrefix = `${firstName.slice(0, 1)}${lastLetter}`;

    return userPrefix;
  }
}
