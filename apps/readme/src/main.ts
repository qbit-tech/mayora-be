import { NestFactory } from '@nestjs/core';
import { ReadmeModule } from './readme.module';

async function bootstrap() {
  const app = await NestFactory.create(ReadmeModule);
  await app.listen(3000);
}
bootstrap();
