import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsModule } from '../products.module';
import { ProductsService } from '../products.service';
import { Product } from '../entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule],
      providers: [ProductsService],
    })
      .overrideProvider(getModelToken(Product.name))
      .useValue(jest.fn())
      .compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of products', async () => {
    const products: Product[] = [
      {
        _id: '62ffb332f4e965f3aab1a6ea',
        name: 'Product 1',
        description: 'Product 1 description',
        price: 100,
        auditProperties: {
          dateCreate: new Date(),
          activeRecord: true,
          userCreate: {
            idUser: '62ffb332f4e965f3aab1a6ea',
            email: 'ilene_schumm@yahoo.com',
          },
        },
      },
    ] as any;

    jest
      .spyOn(service, 'getProucts')
      .mockImplementation(() => Promise.resolve(products));

    expect(await service.getProucts()).toBe(products);

    expect(service.getProucts).toHaveBeenCalled();

    expect(service.getProucts).toHaveBeenCalledTimes(1);
  });

  it('should return an product', async () => {
    const product: Product = {
      _id: '62ffb332f4e965f3aab1a6ea',
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      auditProperties: {
        dateCreate: new Date(),
        activeRecord: true,
        userCreate: {
          idUser: '62ffb332f4e965f3aab1a6ea',
          email: 'Jovanny10@hotmail.com',
        },
      },
    } as any;

    jest
      .spyOn(service, 'getProductById')
      .mockImplementation(() => Promise.resolve(product));

    expect(await service.getProductById('62ffb332f4e965f3aab1a6ea')).toBe(
      product,
    );

    expect(service.getProductById).toHaveBeenCalled();

    expect(service.getProductById).toHaveBeenCalledTimes(1);
  });

  it('should return an products in array ids', async () => {
    const products: Product[] = [
      {
        _id: '62ffb332f4e965f3aab1a6ea',
        name: 'Product 1',
        description: 'Product 1 description',
        price: 100,
        auditProperties: {
          dateCreate: new Date(),
          activeRecord: true,
          userCreate: {
            idUser: '62ffb332f4e965f3aab1a6ea',
            email: 'zita12@hotmail.com',
          },
        },
      },
    ] as any;

    jest

      .spyOn(service, 'getProductsByIds')
      .mockImplementation(() => Promise.resolve(products));

    expect(
      await service.getProductsByIds({
        idsProducts: ['62ffb332f4e965f3aab1a6ea' as any],
      }),
    ).toBe(products);

    expect(service.getProductsByIds).toHaveBeenCalled();

    expect(service.getProductsByIds).toHaveBeenCalledTimes(1);
  });
});
