import { Injectable } from '@nestjs/common';

import { envSchema } from './config.schema';
import { Env } from './config.types';

@Injectable()
export class ConfigService {
  private readonly env: Env;

  constructor() {
    this.env = envSchema.parse(process.env);
  }

  // App
  get port(): number {
    return this.env.PORT;
  }
  get nodeEnv(): string {
    return this.env.NODE_ENV;
  }

  // Database
  get databaseUrl(): string {
    return this.env.DATABASE_URL;
  }

  // Argon2
  get argon2MemoryCost(): number {
    return this.env.ARGON2_MEMORY_COST;
  }
  get argon2TimeCost(): number {
    return this.env.ARGON2_TIME_COST;
  }
  get argon2Parallelism(): number {
    return this.env.ARGON2_PARALLELISM;
  }
  get argon2Pepper(): string {
    return this.env.ARGON2_PEPPER;
  }
}
