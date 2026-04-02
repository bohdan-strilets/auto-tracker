import { INestApplication } from '@nestjs/common';

import helmet from 'helmet';

import { ConfigService } from '@config/config.service';

export const corsSetup = (app: INestApplication, config: ConfigService): void => {
  app.use(helmet());
  app.enableCors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });
};
