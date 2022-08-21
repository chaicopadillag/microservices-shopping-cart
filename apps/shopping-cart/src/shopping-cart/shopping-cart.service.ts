import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAuditoriaDb } from '../common/interfaces/auditoriadb.interface';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { ProductServiceHelper } from './helpers/product-service.helper';
import { ShoppingCartHelper } from './helpers/shopping-cart.helper';
import { UserServiceHelper } from './helpers/user-service.helper';
import {
  EShoppingCartStatus,
  IProductCart,
} from './interfaces/shopping-cart.interface';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart.name)
    private readonly shoppingCartModel: Model<ShoppingCart>,
    private readonly shoppingCartHelper: ShoppingCartHelper,
    private readonly userService: UserServiceHelper,
    private readonly productService: ProductServiceHelper,
  ) {}

  async createShoppingCart(
    createShoppingCartDto: CreateShoppingCartDto,
  ): Promise<ShoppingCart> {
    const { idUser, ...restShoppingcart } = createShoppingCartDto;

    const user = await this.userService.getUserById(idUser);

    const userPrefix = this.shoppingCartHelper.generatePrefix(
      user.firstName,
      user.email,
    );

    const shoppingNumber =
      await this.shoppingCartHelper.generateShoppingCartNumber(
        user._id,
        userPrefix,
      );

    const auditProperties: IAuditoriaDb = {
      dateCreate: new Date(),
      userCreate: {
        idUser: idUser,
        email: user.email,
      },
      activeRecord: true,
    };

    const createdShoppingCart = new this.shoppingCartModel({
      ...restShoppingcart,
      shoppingNumber,
      products: [],
      auditProperties,
      status_create: {
        value: EShoppingCartStatus.CREATE_SHOPPING_CART,
        description: 'Creación de tu carro de compra',
      },
    });

    return await createdShoppingCart.save();
  }

  async getShoppingCartByIdAndUserId(
    idUser: string,
    idShoppingCart: string,
  ): Promise<ShoppingCart> {
    const shoppingCart = await this.shoppingCartModel.findOne({
      'auditProperties.userCreate.idUser': idUser,
      'auditProperties.activeRecord': true,
      _id: idShoppingCart,
    });

    if (!shoppingCart) {
      throw new NotFoundException('ShoppingCart not found');
    }

    return shoppingCart;
  }

  async updateShoppingCart(
    idUser: string,
    updateShoppingCartDto: UpdateShoppingCartDto,
  ): Promise<ShoppingCart> {
    const { idShoppingCart, products } = updateShoppingCartDto;

    const shoppingCart = await this.getShoppingCartByIdAndUserId(
      idUser,
      idShoppingCart,
    );

    const user = await this.userService.getUserById(idUser);

    const productsShoppingCart: IProductCart[] = [];

    if (products.length > 0) {
      const productsIds = products.map((product) => product.idProduct);

      const productsDB = await this.productService.getProductsByIds(
        productsIds,
      );

      for (const { _id, description, url, price } of productsDB) {
        const product = products.find((p) => p.idProduct === _id);
        productsShoppingCart.push({
          idProduct: _id,
          quantity: product.quantity,
          description: description,
          price: price,
          url: url,
        });
      }
    }

    shoppingCart.products = productsShoppingCart;
    shoppingCart.auditProperties.dateUpdate = new Date();
    shoppingCart.auditProperties.userUpdate = {
      idUser: idUser,
      email: user.email,
    };
    shoppingCart.status_update = {
      value: EShoppingCartStatus.UPDATE_PRODUCTS,
      description: 'Actualizacion de productos',
    };

    return await shoppingCart.save();
  }

  async updateShoppingCartStatusGenerateOrder(
    idShoppingCart: string,
  ): Promise<ShoppingCart> {
    const shoppingCart = await this.shoppingCartModel.findById(idShoppingCart);

    if (!shoppingCart) {
      throw new NotFoundException('ShoppingCart not found');
    }

    if (
      shoppingCart?.status_generate?.value ===
      EShoppingCartStatus.GENERATE_PURCHASE_ORDER
    ) {
      throw new UnprocessableEntityException(
        'The shopping cart already has a purchase order generated',
      );
    }

    shoppingCart.status_generate = {
      value: EShoppingCartStatus.GENERATE_PURCHASE_ORDER,
      description: 'Se genero una orden de compra',
    };

    return await shoppingCart.save();
  }
}
