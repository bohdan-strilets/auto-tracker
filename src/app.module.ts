import { Module } from '@nestjs/common';

import { PrismaModule } from './db';

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
