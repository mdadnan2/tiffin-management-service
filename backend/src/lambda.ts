import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import { Handler } from 'aws-lambda';

let cachedServer: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS for Vercel frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger (optional for Lambda)
  const config = new DocumentBuilder()
    .setTitle('Tiffin Management API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event, context) => {
  // Reuse server instance across warm invocations
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }

  return cachedServer(event, context);
};
