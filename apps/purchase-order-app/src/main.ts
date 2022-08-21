import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PurchaseOrderAppModule } from './purchase-order-app.module';

async function bootstrap() {
  const app = await NestFactory.create(PurchaseOrderAppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  await app.listen(4000, () =>
    console.log('Purchase Order App is listening on port 4000'),
  );
}
bootstrap();
