import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getPort } from './utils/get-port';
import { ValidationPipe } from '@nestjs/common';
import { bootstrapElectron } from './bootstrap';

async function bootstrap() {
  const port = await getPort();
  await bootstrapElectron();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  console.log(`service is starting at: ${port}`);

  await app.listen(port);
}

bootstrap();
