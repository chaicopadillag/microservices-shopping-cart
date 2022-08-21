import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartHelper } from './helpers/shopping-cart.helper';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { UserServiceHelper } from './helpers/user-service.helper';
import {
  ShoppingCartExistMiddleware,
  ProductsExistMiddleware,
  UserExistMiddleware,
} from './middleware';
import {
  ShoppingCart,
  ShoppingCartSchema,
} from './entities/shopping-cart.entity';
import { ProductServiceHelper } from './helpers/product-service.helper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
    ]),
  ],
  controllers: [ShoppingCartController],
  providers: [
    AxiosAdapter,
    ShoppingCartService,
    ShoppingCartHelper,
    UserServiceHelper,
    ProductServiceHelper,
  ],
  exports: [MongooseModule],
})
export class ShoppingCartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ShoppingCartExistMiddleware)
      .forRoutes({
        path: 'shopping-cart/v1.0/:idUser',
        method: RequestMethod.PATCH,
      })
      .apply(ProductsExistMiddleware)
      .forRoutes({
        path: 'shopping-cart/v1.0/:idUser',
        method: RequestMethod.PATCH,
      })
      .apply(UserExistMiddleware)
      .forRoutes({
        path: 'shopping-cart/v1.0/:idUser',
        method: RequestMethod.PATCH,
      });
  }
}
