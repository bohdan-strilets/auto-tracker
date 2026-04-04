import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserRepository } from '@modules/user/repositories';

import { JwtTokenService, SessionService } from './services';
import { SessionController } from './session.controller';
import { SessionRepository } from './session.repository';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SessionController],
  providers: [SessionRepository, JwtTokenService, SessionService, UserRepository],
  exports: [SessionService, JwtTokenService],
})
export class SessionModule {}
