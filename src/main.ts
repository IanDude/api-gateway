import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = new ConfigService();
  const PORT = configService.get<string>('PORT') || 3000;
  app.set('x-powered-by', false);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(PORT);
}
bootstrap()
  .then(() => {
    console.log(
      `Gateway is listening to http://localhost:${process.env.PORT}/api`,
    );
  })
  .catch((error) => {
    console.error('Failed to initialize gateway:', error);
  });
