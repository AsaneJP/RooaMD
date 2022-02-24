import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGINS,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Authorization, Accept',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}
bootstrap();
