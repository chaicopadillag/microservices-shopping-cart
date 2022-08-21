import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GetProductsIdsDto } from '../dto/get-products-ids.dto';
import { Product } from '../entities/product.entity';
import { ProductsController } from '../products.controller';
import { ProductsModule } from '../products.module';
import { ProductsService } from '../products.service';
describe('ProductsController', () => {
  let productController: ProductsController;
  let productService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule],
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(getModelToken(Product.name))
      .useValue(jest.fn())
      .compile();

    productController = module.get<ProductsController>(ProductsController);
    productService = module.get<ProductsService>(ProductsService);
  });

  it('Debe de retornar un Array de Productos', async () => {
    jest.spyOn(productService, 'getProucts').mockImplementation(() =>
      Promise.resolve([
        {
          _id: '62ffb332f4e965f3aab1a6ea',
          name: 'Producto 1',
          description: 'Producto 1',
          status: {
            value: 1,
            description: 'Creado por base de datos',
          },
          auditProperties: {
            dateCreate: '1661005189887',
            activeRecord: true,
          },
        },
      ] as any as Promise<Product[]>),
    );
    const result = await productController.getProducts();

    expect(result).toHaveLength(1);

    expect(result[0]).toHaveProperty('_id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('description');
    expect(result[0]).toHaveProperty('status');
    expect(result[0]).toHaveProperty('auditProperties');

    expect(productService.getProucts).toHaveBeenCalledTimes(1);
  });

  it('Debe de retornar un Producto', async () => {
    jest.spyOn(productService, 'getProductById').mockImplementation(() =>
      Promise.resolve({
        _id: '62ffb332f4e965f3aab1a6ea',
        name: 'Producto 1',
        description: 'Producto 1',
        status: {
          value: 1,
          description: 'Creado por base de datos',
        },
        auditProperties: {
          dateCreate: '1661005189887',
          activeRecord: true,
        },
      } as any as Promise<Product>),
    );
    const result = await productController.getProductById(
      '62ffb332f4e965f3aab1a6ea',
    );

    expect(result).toHaveProperty('_id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('auditProperties');

    expect(productService.getProductById).toHaveBeenCalledTimes(1);
  });

  it('Debe de retornar un Productos por IDs', async () => {
    jest.spyOn(productService, 'getProductsByIds').mockImplementation(() =>
      Promise.resolve([
        {
          _id: '62ffb332f4e965f3aab1a6ea',
          name: 'Producto 1',
          description: 'Producto 1',
          status: {
            value: 1,
            description: 'Creado por base de datos',
          },
          auditProperties: {
            dateCreate: '1661005189887',
            activeRecord: true,
          },
        },
      ] as any as Promise<Product[]>),
    );

    const dto: GetProductsIdsDto = {
      idsProducts: ['62ffb332f4e965f3aab1a6ea' as any],
    };

    const result = await productController.getProductsByIds(dto);

    expect(result).toHaveLength(1);

    expect(result[0]).toHaveProperty('_id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('description');
    expect(result[0]).toHaveProperty('status');
    expect(result[0]).toHaveProperty('auditProperties');

    expect(productService.getProductsByIds).toHaveBeenCalledTimes(1);
  });
});
