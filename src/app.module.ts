import { Module } from '@nestjs/common';

import { AuthCredentialsModule } from '@modules/auth-credentials/auth-credentials.module';
import { EmailTokenModule } from '@modules/email-token/email-token.module';
import { OAuthModule } from '@modules/oauth/oauth.module';
import { SessionModule } from '@modules/session/session.module';

import { CryptoModule } from '@common/crypto/crypto.module';
import { MailModule } from '@common/mail/mail.module';

import { ConfigModule } from '@config/config.module';

import { PrismaModule } from './db';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    CryptoModule,
    UserModule,
    AuthCredentialsModule,
    OAuthModule,
    EmailTokenModule,
    SessionModule,
    MailModule,
  ],
})
export class AppModule {}
