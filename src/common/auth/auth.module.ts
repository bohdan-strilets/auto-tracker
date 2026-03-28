import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Global()
@Module({
  imports: [PassportModule],
  providers: [JwtAccessStrategy],
})
export class AuthGuardModule {}
