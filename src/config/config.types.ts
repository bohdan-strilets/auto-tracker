import z from 'zod';

import { envSchema } from './config.schema';

export type Env = z.infer<typeof envSchema>;
