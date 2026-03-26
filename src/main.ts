import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import cookieParser from 'cookie-parser';

import { GlobalExceptionFilter } from '@common/exceptions/filter';
import { createValidationPipe } from '@common/pipes';
import { setupSwagger } from '@common/swagger';

import { ConfigService } from '@config/config.service';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const port = config.port;
  const nodeEnv = config.nodeEnv;
  const isProduction = config.isProduction;

  if (!isProduction) {
    setupSwagger(app);
  }

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(createValidationPipe());
  app.use(cookieParser());

  await app.listen(port);

  logger.verbose(`Server is running on port ${port} in ${nodeEnv} environment`);
}
void bootstrap();
