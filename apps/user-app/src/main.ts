import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UserAppModule } from './user-app.module';

async function bootstrap() {
  const app = await NestFactory.create(UserAppModule);

  // app.enableCors({ credentials: true, origin: ['http://localhost:5000'] });

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

  await app.listen(6000, () =>
    console.log('User App is listening on port 6000'),
  );
}
bootstrap();
