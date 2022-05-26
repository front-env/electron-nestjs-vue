import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { bootstrapElectron } from './bootstrap';
import { findPort, getPort } from './utils/port';

async function bootstrap() {
  await findPort({
    port: 2999,
    portRange: [2900, 65535],
  });
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

  const port = getPort();
  console.log(`service is starting at: ${port}`);

  await app.listen(port);
}

bootstrap();
