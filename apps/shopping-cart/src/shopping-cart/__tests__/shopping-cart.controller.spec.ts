import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartController } from '../shopping-cart.controller';
import { ShoppingCartModule } from '../shopping-cart.module';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../entities/shopping-cart.entity';
import { AxiosAdapter } from '../../common/adapters/axios.adapter';
import { ShoppingCartHelper } from '../helpers/shopping-cart.helper';
import { UserServiceHelper } from '../helpers/user-service.helper';
import { ProductServiceHelper } from '../helpers/product-service.helper';
import { CreateShoppingCartDto } from '../dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from '../dto/update-shopping-cart.dto';

describe('ShoppingCartController', () => {
  let cartController: ShoppingCartController;
  let cartService: ShoppingCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ShoppingCartModule],
      controllers: [ShoppingCartController],
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

    cartController = module.get<ShoppingCartController>(ShoppingCartController);
    cartService = module.get<ShoppingCartService>(ShoppingCartService);
  });

  it('Debe retonar el un Carrito de compra', async () => {
    jest
      .spyOn(cartService, 'getShoppingCartByIdAndUserId')
      .mockImplementation(() =>
        Promise.resolve({
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
            dateCreate: '1661017639754',
            userCreate: {
              idUser: '62ffb332f4e965f3aab1a6eb',
              email: 'justen_quitzon@yahoo.com',
            },
            activeRecord: true,
          },
          status_update: {
            value: 2,
            description: 'Actualizacion de productos',
          },
        } as any as Promise<ShoppingCart>),
      );

    const result = await cartController.getShoppingCartByIdAndUserId(
      '63011e27775ee3049e1df211',
      '62ffb332f4e965f3aab1a6eb',
    );

    expect(result).toBeDefined();

    expect(result).toHaveProperty('_id');
    expect(result).toHaveProperty('shoppingNumber');
    expect(result).toHaveProperty('products');
    expect(result).toHaveProperty('status_create');
    expect(result).toHaveProperty('auditProperties');
    expect(result).toHaveProperty('status_update');

    expect(result.products).toBeInstanceOf(Array);
    expect(result.products).toHaveLength(1);
    expect(cartService.getShoppingCartByIdAndUserId).toHaveBeenCalledTimes(1);
  });

  it('Debe retonar de Crear un carrito de compra', async () => {
    jest.spyOn(cartService, 'createShoppingCart').mockImplementation(() =>
      Promise.resolve({
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
          dateCreate: '1661017639754',
          userCreate: {
            idUser: '62ffb332f4e965f3aab1a6eb',
            email: 'javon.west96@yahoo.com',
          },
          activeRecord: true,
        },
      } as any as Promise<ShoppingCart>),
    );

    const result = await cartController.createShoppingCart({
      idUser: '62ffb332f4e965f3aab1a6eb',
    } as CreateShoppingCartDto);

    expect(result).toBeDefined();

    expect(result).toHaveProperty('_id');
    expect(result).toHaveProperty('shoppingNumber');
    expect(result).toHaveProperty('products');
    expect(result).toHaveProperty('status_create');
    expect(result).toHaveProperty('auditProperties');

    expect(result.products).toBeInstanceOf(Array);
    expect(cartService.createShoppingCart).toHaveBeenCalledTimes(1);
  });

  it('Debe retonar de Actualizar un carrito de compra', async () => {
    jest.spyOn(cartService, 'updateShoppingCart').mockImplementation(() =>
      Promise.resolve({
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
          dateCreate: '1661017639754',
          userCreate: {
            idUser: '62ffb332f4e965f3aab1a6eb',
            email: 'tiara6@yahoo.com',
          },
          activeRecord: true,
        },
        status_update: {
          value: 2,
          description: 'Actualizacion de productos',
        },
      } as any as Promise<ShoppingCart>),
    );

    const result = await cartService.updateShoppingCart(
      '63011e27775ee3049e1df211',
      {
        idShoppingCart: '63011e27775ee3049e1df211',
        idUser: '62ffb332f4e965f3aab1a6eb',
        products: [
          {
            idProduct: '63003a288c5932b985e5de70',
            quantity: 10,
          },
        ],
      } as UpdateShoppingCartDto,
    );

    expect(result).toBeDefined();

    expect(result).toHaveProperty('_id');
    expect(result).toHaveProperty('shoppingNumber');
    expect(result).toHaveProperty('products');
    expect(result).toHaveProperty('auditProperties');
    expect(result).toHaveProperty('status_update');
    expect(result.products).toBeInstanceOf(Array);
    expect(result.products).toHaveLength(1);
    expect(cartService.updateShoppingCart).toHaveBeenCalledTimes(1);
  });

  it('Debe retonar de Actualizar el estado carrito de compra', async () => {
    jest
      .spyOn(cartService, 'updateShoppingCartStatusGenerateOrder')
      .mockImplementation(() =>
        Promise.resolve({} as any as Promise<ShoppingCart>),
      );

    const result = await cartService.updateShoppingCartStatusGenerateOrder(
      '63011e27775ee3049e1df211',
    );

    expect(result).toBeDefined();
    expect(
      cartService.updateShoppingCartStatusGenerateOrder,
    ).toHaveBeenCalledTimes(1);
  });
});
