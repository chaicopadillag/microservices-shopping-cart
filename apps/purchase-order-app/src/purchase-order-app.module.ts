import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { appEnvironment, appEnvironmentValidate } from './env';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appEnvironment],
      validationSchema: appEnvironmentValidate,
    }),
    EventEmitterModule.forRoot(),
    CommonModule,
    DatabaseModule,
    PurchaseOrderModule,
  ],
  controllers: [],
  providers: [],
  exports: [ConfigModule],
})
export class PurchaseOrderAppModule {}
