import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { IAuditoriaDb } from 'apps/product-app/src/common/interfaces/auditoriadb.interface';
import { Model } from 'mongoose';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { PurchaseOrderHelper } from './helpers/purchase-order.helper';
import { ShoppingCartServiceHelper } from './helpers/shopping-cart-service.helper';
import { UserServiceHelper } from './helpers/user-service.helper';

@Injectable()
export class PurchaseOrderService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectModel(PurchaseOrder.name)
    private readonly purchaseOrderModel: Model<PurchaseOrder>,
    private readonly orderHelper: PurchaseOrderHelper,
    private readonly userService: UserServiceHelper,
    private readonly shoppingCartService: ShoppingCartServiceHelper,
  ) {}

  async createPurchaseOrder(
    createPurchaseOrderDto: CreatePurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    try {
      const { idShoppingCart, idUser, deliveryDate } = createPurchaseOrderDto;

      const user = await this.userService.getUserById(idUser);

      const userPrefix = this.orderHelper.generatePrefix(
        user.firstName,
        user.email,
      );

      const orderNumber = await this.orderHelper.generatePurchaseOrderNumber(
        idUser,
        userPrefix,
      );

      const shoppingCart =
        await this.shoppingCartService.getShoppingCartByIdAndUser(
          idShoppingCart,
          idUser,
        );

      const products = shoppingCart.products;

      const auditProperties: IAuditoriaDb = {
        dateCreate: new Date(),
        userCreate: {
          idUser: idUser,
          email: user.email,
        },
        activeRecord: true,
      };

      const newOrder = new this.purchaseOrderModel({
        orderNumber,
        shoppingNumber: shoppingCart.shoppingNumber,
        deliveryDate,
        products,
        auditProperties,
        status: {
          value: 1,
          description: 'Orden de compra generada',
        },
      });

      const order = await newOrder.save();

      this.eventEmitter.emit('shoppingCartPurchaseOrderCreate', {
        idShoppingCart: shoppingCart._id,
      });

      return order;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error al crear la orden de compra',
      );
    }
  }

  async getPurchaseOrders(idUser: string): Promise<PurchaseOrder[]> {
    return await this.purchaseOrderModel.find({
      'auditProperties.userCreate.idUser': idUser,
      'auditProperties.activeRecord': true,
    });
  }

  async getPurchaseOrderById(
    idUser: string,
    idOrder: string,
  ): Promise<PurchaseOrder> {
    const purchaseOrder = await this.purchaseOrderModel.findOne({
      'auditProperties.userCreate.idUser': idUser,
      'auditProperties.activeRecord': true,
      _id: idOrder,
    });

    if (!purchaseOrder)
      throw new NotFoundException('Orden de compra no encontrada');

    return purchaseOrder;
  }

  @OnEvent('shoppingCartPurchaseOrderCreate')
  async handleOrderCreatedEvent(payload: { idShoppingCart: string }) {
    await this.shoppingCartService.updateShoppingCartStatusGenerateOrder(
      payload.idShoppingCart,
    );
  }
}
