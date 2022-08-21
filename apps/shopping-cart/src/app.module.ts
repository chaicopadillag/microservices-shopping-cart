import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { appEnvironmentValidate, appEnvironment } from './env';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appEnvironment],
      validationSchema: appEnvironmentValidate,
    }),
    CommonModule,
    DatabaseModule,
    ShoppingCartModule,
  ],
  controllers: [],
  providers: [],
  exports: [ConfigModule],
})
export class AppModule {
  static APP_PORT: number;
  constructor(private readonly env: ConfigService) {
    AppModule.APP_PORT = env.get<number>('PORT') | 5000;
  }
}
