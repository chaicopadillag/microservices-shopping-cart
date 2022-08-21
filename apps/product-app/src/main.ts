import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductAppModule } from './product-app.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductAppModule);
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

  await app.listen(3000, () =>
    console.log('Product App is listening on port 3000'),
  );

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   ProductAppModule,
  //   {
  //     transport: Transport.TCP,
  //   },
  // );
  // await app.listen();
}
bootstrap();
