import { Module } from '@nestjs/common';

import { AuthCredentialsModule } from '@modules/auth-credentials/auth-credentials.module';
import { EmailTokenModule } from '@modules/email-token/email-token.module';
import { SessionModule } from '@modules/session/session.module';
import { UserModule } from '@modules/user/user.module';

import { DeviceModule } from '@common/device/device.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, AuthCredentialsModule, EmailTokenModule, DeviceModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
