import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '@modules/user/user.module';

import { JwtTokenService, SessionService } from './services';
import { SessionController } from './session.controller';
import { SessionRepository } from './session.repository';

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [SessionController],
  providers: [SessionRepository, JwtTokenService, SessionService],
  exports: [SessionService, JwtTokenService],
})
export class SessionModule {}
