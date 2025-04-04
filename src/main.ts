import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
console.log('Environment variables check:', {
  JWT_SECRET: process.env.JWT_SECRET ? 'Exists' : 'Missing',
  NODE_ENV: process.env.NODE_ENV,
});
}
bootstrap();
