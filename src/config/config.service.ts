import { Injectable } from '@nestjs/common';

import { envSchema } from './config.schema';
import { Env } from './config.types';

@Injectable()
export class ConfigService {
  private readonly env: Env;

  constructor() {
    this.env = envSchema.parse(process.env);
  }

  get port(): number {
    return this.env.PORT;
  }

  get nodeEnv(): string {
    return this.env.NODE_ENV;
  }

  get databaseUrl(): string {
    return this.env.DATABASE_URL;
  }
}
