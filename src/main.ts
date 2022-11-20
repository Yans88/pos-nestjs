import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const configSwagger = new DocumentBuilder()
    .setTitle('POS Nest JS')
    .setDescription('Dokumentasi POS')
    .setVersion('1.0')
    .build();

  const configCustomSwagger: SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: 'none' },
  };
  const doc = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('doc', app, doc, configCustomSwagger);
  await app.listen(3000);
}
bootstrap();
