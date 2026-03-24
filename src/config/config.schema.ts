import z from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  DATABASE_URL: z.url(),

  ARGON2_MEMORY_COST: z.coerce.number().min(1).max(1048576).default(65536),
  ARGON2_TIME_COST: z.coerce.number().min(1).default(3),
  ARGON2_PARALLELISM: z.coerce.number().min(1).default(4),
  ARGON2_PEPPER: z.string().min(1).max(256),
});
