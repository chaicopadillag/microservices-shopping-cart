import { EventEmitterModule } from '@nestjs/event-emitter';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderController } from '../purchase-order.controller';
import { PurchaseOrderService } from '../purchase-order.service';
import { PurchaseOrder } from '../entities/purchase-order.entity';
import { AxiosAdapter } from '../../common/adapters/axios.adapter';
import { PurchaseOrderHelper } from '../helpers/purchase-order.helper';
import { UserServiceHelper } from '../helpers/user-service.helper';
import { ShoppingCartServiceHelper } from '../helpers/shopping-cart-service.helper';
import { PurchaseOrderModule } from '../purchase-order.module';
import { CreatePurchaseOrderDto } from '../dto/create-purchase-order.dto';

describe('PurchaseOrderController', () => {
  let orderController: PurchaseOrderController;
  let orderService: PurchaseOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot(), PurchaseOrderModule],
      controllers: [PurchaseOrderController],
      providers: [
        PurchaseOrderService,
        AxiosAdapter,
        PurchaseOrderHelper,
        UserServiceHelper,
        ShoppingCartServiceHelper,
      ],
    })
      .overrideProvider(getModelToken(PurchaseOrder.name))
      .useValue(jest.fn())
      .compile();

    orderController = module.get<PurchaseOrderController>(
      PurchaseOrderController,
    );
    orderService = module.get<PurchaseOrderService>(PurchaseOrderService);
  });

  it('Debe de retoner las ordes de compras de usuario', async () => {
    jest.spyOn(orderService, 'getPurchaseOrders').mockImplementation(() =>
      Promise.resolve([
        {
          _id: '63011d85a64063931d8f3fc2',
          orderNumber: 'PO_AN0001',
          shoppingNumber: 'SH_AN0001',
          deliveryDate: '1661385600000',
          products: [
            {
              idProduct: '63003a288c5932b985e5de70',
              quantity: 10,
              description:
                'Yogurt Parcialmente Descremado Durazno Gloria Botella 1 kg',
              price: 4.5,
              url: 'https://wongfood.vteximg.com.br/arquivos/ids/354766/',
            },
          ],
          status: {
            value: 1,
            description: 'Orden de compra generada',
          },
          auditProperties: {
            dateCreate: '1661017477197',
            userCreate: {
              idUser: '62ffb332f4e965f3aab1a6eb',
              email: 'justen_quitzon@yahoo.com',
            },
            activeRecord: true,
          },
        },
      ] as any as Promise<PurchaseOrder[]>),
    );
    const result = await orderController.getPurchaseOrders(
      '62ffb332f4e965f3aab1a6eb',
    );
    expect(result).toHaveLength(1);

    expect(result[0]).toHaveProperty('_id');
    expect(result[0]).toHaveProperty('orderNumber');
    expect(result[0]).toHaveProperty('shoppingNumber');
    expect(result[0]).toHaveProperty('deliveryDate');
    expect(result[0]).toHaveProperty('products');
    expect(result[0]).toHaveProperty('status');
    expect(result[0]).toHaveProperty('auditProperties');

    expect(result[0].products).toBeInstanceOf(Array);
    expect(orderService.getPurchaseOrders).toHaveBeenCalledTimes(1);
  });

  it('Debe de retoner una orden de compra de usuario', async () => {
    jest.spyOn(orderService, 'getPurchaseOrderById').mockImplementation(() =>
      Promise.resolve({
        _id: '63011d85a64063931d8f3fc2',
        orderNumber: 'PO_AN0001',
        shoppingNumber: 'SH_AN0001',
        deliveryDate: '1661385600000',
        products: [
          {
            idProduct: '63003a288c5932b985e5de70',
            quantity: 10,
            description:
              'Yogurt Parcialmente Descremado Durazno Gloria Botella 1 kg',
            price: 4.5,
            url: 'https://wongfood.vteximg.com.br/arquivos/ids/354766/',
          },
        ],
        status: {
          value: 1,
          description: 'Orden de compra generada',
        },
        auditProperties: {
          dateCreate: '1661017477197',
          userCreate: {
            idUser: '62ffb332f4e965f3aab1a6eb',
            email: 'oscar_schumm18@yahoo.com',
          },
          activeRecord: true,
        },
      } as any as Promise<PurchaseOrder>),
    );

    const result = await orderController.getPurchaseOrderById(
      '63011d85a64063931d8f3fc2',
      '62ffb332f4e965f3aab1a6eb',
    );

    expect(result).toHaveProperty('_id');
    expect(result).toHaveProperty('orderNumber');
    expect(result).toHaveProperty('shoppingNumber');
    expect(result).toHaveProperty('deliveryDate');
    expect(result).toHaveProperty('products');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('auditProperties');

    expect(result.products).toBeInstanceOf(Array);
    expect(orderService.getPurchaseOrderById).toHaveBeenCalledTimes(1);
  });

  it('Debe de crear un order de compra', async () => {
    jest.spyOn(orderService, 'createPurchaseOrder').mockImplementation(() =>
      Promise.resolve({
        _id: '63011d85a64063931d8f3fc2',
        orderNumber: 'PO_AN0001',
        shoppingNumber: 'SH_AN0001',
        deliveryDate: '1661385600000',
        products: [
          {
            idProduct: '63003a288c5932b985e5de70',
            quantity: 10,
            description:
              'Yogurt Parcialmente Descremado Durazno Gloria Botella 1 kg',
            price: 4.5,
            url: 'https://wongfood.vteximg.com.br/arquivos/ids/354766/',
          },
        ],
        status: {
          value: 1,
          description: 'Orden de compra generada',
        },
        auditProperties: {
          dateCreate: '1661017477197',
          userCreate: {
            idUser: '62ffb332f4e965f3aab1a6eb',
            email: 'hector2@gmail.com',
          },
          activeRecord: true,
        },
      } as any as Promise<PurchaseOrder>),
    );

    const result = await orderController.createPurchaseOrder({
      idShoppingCart: 'f8f8f8f8f8f8f8f8f8f8f8f',
      idUser: '62ffb332f4e965f3aab1a6eb',
    } as CreatePurchaseOrderDto);

    expect(result).toHaveProperty('_id');
    expect(result).toHaveProperty('orderNumber');
    expect(result).toHaveProperty('shoppingNumber');
    expect(result).toHaveProperty('deliveryDate');
    expect(result).toHaveProperty('products');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('auditProperties');

    expect(result.products).toBeInstanceOf(Array);
    expect(orderService.createPurchaseOrder).toHaveBeenCalledTimes(1);
  });
});
