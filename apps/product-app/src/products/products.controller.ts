import { Body, Controller, Get, Param } from '@nestjs/common';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { GetProductsIdsDto } from './dto/get-products-ids.dto';
import { ProductsService } from './products.service';

@Controller('products/v1.0')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProucts();
  }

  @Get(':idProduct')
  getProductById(@Param('idProduct', ParseMongoIdPipe) idProduct: string) {
    return this.productsService.getProductById(idProduct);
  }

  @Get('get-products/ids')
  getProductsByIds(@Body() getProductsIdsDto: GetProductsIdsDto) {
    return this.productsService.getProductsByIds(getProductsIdsDto);
  }
}
