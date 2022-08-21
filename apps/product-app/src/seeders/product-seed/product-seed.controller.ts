import { Controller, Post } from '@nestjs/common';
import { ProductSeedService } from './product-seed.service';

@Controller('product-seed')
export class ProductSeedController {
  constructor(private readonly productSeedService: ProductSeedService) {}

  @Post()
  async seedProducts() {
    return await this.productSeedService.seedProducts();
  }
}
