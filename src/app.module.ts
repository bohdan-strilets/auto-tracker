import { Module } from '@nestjs/common';

import { ConfigModule } from '@config/config.module';

import { PrismaModule } from './db';

@Module({
  imports: [PrismaModule, ConfigModule],
})
export class AppModule {}
