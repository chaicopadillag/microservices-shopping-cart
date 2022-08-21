import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { ProductSeedController } from './product-seed/product-seed.controller';
import { ProductSeedService } from './product-seed/product-seed.service';

@Module({
  imports: [ProductsModule],
  controllers: [ProductSeedController],
  providers: [ProductSeedService],
})
export class SeedersModule {}
