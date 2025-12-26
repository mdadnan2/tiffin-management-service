import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters';
import serverlessExpress from '@vendia/serverless-express';
import { Handler } from 'aws-lambda';

let cachedServer: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Tiffin Management API')
    .setDescription('Unified API for meal management system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // For Lambda
  if (process.env.AWS_EXECUTION_ENV) {
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
  }

  // For local development
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Tiffin Management API running on http://0.0.0.0:${port}`);
  console.log(`📚 Swagger docs available at http://0.0.0.0:${port}/api/docs`);
}

// Lambda handler
export const handler: Handler = async (event, context, callback) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(event, context, callback);
};

// Local development
if (!process.env.AWS_EXECUTION_ENV) {
  bootstrap();
}
