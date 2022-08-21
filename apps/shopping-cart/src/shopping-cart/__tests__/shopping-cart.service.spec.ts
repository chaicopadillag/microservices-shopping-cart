import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosAdapter } from '../../common/adapters/axios.adapter';
import { CreateShoppingCartDto } from '../dto/create-shopping-cart.dto';
import { ShoppingCart } from '../entities/shopping-cart.entity';
import { ProductServiceHelper } from '../helpers/product-service.helper';
import { ShoppingCartHelper } from '../helpers/shopping-cart.helper';
import { UserServiceHelper } from '../helpers/user-service.helper';
import { ShoppingCartModule } from '../shopping-cart.module';
import { ShoppingCartService } from '../shopping-cart.service';
import { UpdateShoppingCartDto } from '../dto/update-shopping-cart.dto';
describe('ShoppingCartService', () => {
  let service: ShoppingCartService;

  const mockShoppingCart: ShoppingCart = {
    _id: '63011e27775ee3049e1df211',
    shoppingNumber: 'SH_AN0002',
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
    status_create: {
      value: 1,
      description: 'Creación de tu carro de compra',
    },
    auditProperties: {
      dateCreate: new Date(),
      activeRecord: true,
      userCreate: {
        idUser: '63011e27775ee3049e1df211',
        email: 'anderson.harris87@hotmail.com',
      },
    },
  } as ShoppingCart;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ShoppingCartModule],
      providers: [
        ShoppingCartService,
        AxiosAdapter,
        ShoppingCartHelper,
        UserServiceHelper,
        ProductServiceHelper,
      ],
    })
      .overrideProvider(getModelToken(ShoppingCart.name))
      .useValue(jest.fn())
      .compile();

    service = module.get<ShoppingCartService>(ShoppingCartService);
  });

  it('should crete a new shopping cart', async () => {
    mockShoppingCart.products = [];
    jest
      .spyOn(service, 'createShoppingCart')
      .mockResolvedValue(Promise.resolve(mockShoppingCart));

    const result = await service.createShoppingCart({
      idUser: '5e9f8f8f8f8f8f8f8f8f8f8',
    } as CreateShoppingCartDto);

    expect(result).toEqual(mockShoppingCart);

    expect(service.createShoppingCart).toHaveBeenCalledTimes(1);
  });

  it('should return a list of shopping carts', async () => {
    jest
      .spyOn(service, 'getShoppingCartByIdAndUserId')
      .mockImplementation(() => Promise.resolve(mockShoppingCart));
    const result = await service.getShoppingCartByIdAndUserId(
      '63011e27775ee3049e1df211',
      '63011e27775ee3049e1df211',
    );
    expect(result).toEqual(mockShoppingCart);

    expect(service.getShoppingCartByIdAndUserId).toHaveBeenCalledTimes(1);
  });

  it('update a shopping cart', async () => {
    jest
      .spyOn(service, 'updateShoppingCart')
      .mockResolvedValue(Promise.resolve(mockShoppingCart));
    const result = await service.updateShoppingCart(
      '63011e27775ee3049e1df211',
      {
        idShoppingCart: '63011e27775ee3049e1df211',
        idUser: '63011e27775ee3049e1df211',
        products: [
          {
            idProduct: '63003a288c5932b985e5de70',
            quantity: 10,
          },
        ],
      } as UpdateShoppingCartDto,
    );

    expect(result).toEqual(mockShoppingCart);

    expect(service.updateShoppingCart).toHaveBeenCalledTimes(1);
  });

  it('update a shopping cart status generate purchaseorder', async () => {
    jest
      .spyOn(service, 'updateShoppingCartStatusGenerateOrder')
      .mockResolvedValue(Promise.resolve(mockShoppingCart));

    const result = await service.updateShoppingCartStatusGenerateOrder(
      '63011e27775ee3049e1df211',
    );

    expect(result).toEqual(mockShoppingCart);

    expect(service.updateShoppingCartStatusGenerateOrder).toHaveBeenCalledTimes(
      1,
    );
  });
});
