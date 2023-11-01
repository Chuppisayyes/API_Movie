import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('swagger')
  .setDescription('descripton')
  .addBearerAuth()
  .build();
  app.enableCors({ origin: "*" }); // CORS() cho phép FE truy cập vào BE
  app.use(express.static("./public/img"));

  await app.listen(8080);
}
bootstrap();
