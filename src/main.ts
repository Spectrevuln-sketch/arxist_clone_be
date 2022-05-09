import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /** Class Validation */
  app.useGlobalPipes(new ValidationPipe())

  /** Api Versioning */
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(cookieParser());

  /** Swagger */
  const config = new DocumentBuilder().setTitle('Arxist Clone API Doc')
    .setDescription('Clone Arxist API Spec')
    .addTag('Arxist')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


  app.enableCors({
    origin: true,
    credentials: true
  })
  await app.listen(5773);
}
bootstrap();
