import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" }); // CORS() cho phép FE truy cập vào BE
  app.use(express.static("."));

  const config = new DocumentBuilder().setTitle("Node 33").setVersion("1.1.3").addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(8080);
}
bootstrap();
