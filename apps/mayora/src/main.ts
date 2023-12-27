import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { OutputExceptionFilter } from './core/output.filter';
import { OutputInterceptor } from './core/output.interceptor';
import { AppModule } from './app.module';
import * as appJSON from '../app.json';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error'],
  });

  const config = new DocumentBuilder()
    .setTitle(appJSON.name)
    .setDescription('API Documentation')
    .setVersion(appJSON.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalInterceptors(new OutputInterceptor());
  app.useGlobalFilters(new OutputExceptionFilter());
  app.enableCors({ origin: true, exposedHeaders: ['*'] });
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: true }));

  const port = process.env.HTTP_PORT || 4000;
  await app.listen(port);
  console.info('localhost:' + port);
}
bootstrap();
