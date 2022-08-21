import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { appEnvironment, appEnvironmentValidate } from './env';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { SeedersModule } from './seeders/seeders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appEnvironment],
      validationSchema: appEnvironmentValidate,
    }),
    DatabaseModule,
    CommonModule,
    SeedersModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
  exports: [ConfigModule],
})
export class ProductAppModule {}
