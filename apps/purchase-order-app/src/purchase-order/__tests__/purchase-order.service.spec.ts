import { EventEmitterModule } from '@nestjs/event-emitter';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosAdapter } from '../../common/adapters/axios.adapter';
import { PurchaseOrder } from '../entities/purchase-order.entity';
import { PurchaseOrderHelper } from '../helpers/purchase-order.helper';
import { ShoppingCartServiceHelper } from '../helpers/shopping-cart-service.helper';
import { UserServiceHelper } from '../helpers/user-service.helper';
import { PurchaseOrderModule } from '../purchase-order.module';
import { PurchaseOrderService } from '../purchase-order.service';
import { CreatePurchaseOrderDto } from '../dto/create-purchase-order.dto';

describe('PurchaseOrderService', () => {
  let service: PurchaseOrderService;
  const mockOrderPurchase: PurchaseOrder = {
    _id: '63011d85a64063931d8f3fc2',
    orderNumber: 'PO_AN0001',
    shoppingNumber: 'SH_AN0001',
    deliveryDate: new Date('2020-01-01'),
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
      activeRecord: true,
      dateCreate: new Date('2020-01-01'),
      userCreate: {
        idUser: '63011d85a64063931d8f3fc2',
        email: 'amani_hettinger@gmail.com',
      },
    },
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot(), PurchaseOrderModule],
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

    service = module.get<PurchaseOrderService>(PurchaseOrderService);
  });

  it('createPurchaseOrder', async () => {
    jest
      .spyOn(service, 'createPurchaseOrder')
      .mockImplementation(() => Promise.resolve(mockOrderPurchase));

    const result = await service.createPurchaseOrder({
      deliveryDate: '1661385600000',
      idShoppingCart: '63011d85a64063931d8f3fc2',
    } as CreatePurchaseOrderDto);

    expect(result).toEqual(mockOrderPurchase);

    expect(service.createPurchaseOrder).toHaveBeenCalledTimes(1);
  });

  it('getPurchaseOrders', async () => {
    jest
      .spyOn(service, 'getPurchaseOrders')
      .mockImplementation(() => Promise.resolve([mockOrderPurchase]));

    const result = await service.getPurchaseOrders('63011d85a64063931d8f3fc2');

    expect(result).toEqual([mockOrderPurchase]);

    expect(service.getPurchaseOrders).toHaveBeenCalledTimes(1);
  });

  it('getPurchaseOrderById', async () => {
    jest
      .spyOn(service, 'getPurchaseOrderById')
      .mockImplementation(() => Promise.resolve(mockOrderPurchase));

    const result = await service.getPurchaseOrderById(
      '63011d85a64063931d8f3fc2',
      '63011d85a64063931d8f3fc2',
    );

    expect(result).toEqual(mockOrderPurchase);

    expect(service.getPurchaseOrderById).toHaveBeenCalledTimes(1);
  });

  it('handleOrderCreatedEvent', async () => {
    jest
      .spyOn(service, 'handleOrderCreatedEvent')
      .mockImplementation(() => Promise.resolve());

    await service.handleOrderCreatedEvent({
      idShoppingCart: '63011d85a64063931d8f3fc2',
    });

    expect(service.handleOrderCreatedEvent).toHaveBeenCalledTimes(1);
  });
});
