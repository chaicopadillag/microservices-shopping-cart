import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderController } from './purchase-order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PurchaseOrder,
  PurchaseOrderSchema,
} from './entities/purchase-order.entity';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { UserServiceHelper } from './helpers/user-service.helper';
import { ShoppingCartServiceHelper } from './helpers/shopping-cart-service.helper';
import { PurchaseOrderHelper } from './helpers/purchase-order.helper';
import {
  PurchaseOrderMiddleware,
  ShoppingCartPurchaseOrderMiddleware,
} from './middlewares';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PurchaseOrder.name, schema: PurchaseOrderSchema },
    ]),
  ],
  controllers: [PurchaseOrderController],
  providers: [
    AxiosAdapter,
    PurchaseOrderHelper,
    PurchaseOrderService,
    UserServiceHelper,
    ShoppingCartServiceHelper,
  ],
  exports: [MongooseModule],
})
export class PurchaseOrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ShoppingCartPurchaseOrderMiddleware)
      .forRoutes({
        path: 'purchase-order/v1.0',
        method: RequestMethod.POST,
      })
      .apply(PurchaseOrderMiddleware)
      .forRoutes({
        path: 'purchase-order/v1.0',
        method: RequestMethod.POST,
      });
  }
}
