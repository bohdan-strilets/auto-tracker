import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { ConfigService } from '@config/config.service';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          name: 'default',
          ttl: config.throttleDefaultTtl,
          limit: config.throttleDefaultLimit,
        },
        {
          name: 'auth',
          ttl: config.throttleAuthTtl,
          limit: config.throttleAuthLimit,
        },
      ],
    }),
  ],
})
export class ThrottlerConfigModule {}
