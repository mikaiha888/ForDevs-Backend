import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import dataSource from '../ormconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const ormconfig = new DataSource(dataSource);
  await ormconfig
    .initialize()
    .then(() => console.log('Data Source has been initialized!'))
    .catch((error) =>
      console.error('Error during Data Source initialization:', error),
    );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({});

  await app.listen(3000);
}
bootstrap();
