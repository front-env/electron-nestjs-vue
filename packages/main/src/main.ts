import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getPort } from './utils/get-port';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
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
  const port = await getPort();
  console.log(`service is starting at: ${port}`);
  await app.listen(port);
}
bootstrap();
