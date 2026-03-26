import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { RegistrationSource } from '@prisma/client';

import { AuthCredentialsService } from '@modules/auth-credentials/auth-credentials.service';
import { EmailTokenService } from '@modules/email-token/email-token.service';
import { SessionService } from '@modules/session/services/session.service';
import { AccessTokenPayload } from '@modules/session/types';
import { CreateUserInput } from '@modules/user/types';
import { toUserResponseDto } from '@modules/user/user.mapper';
import { UserService } from '@modules/user/user.service';

import { PasswordService } from '@common/crypto/services';
import { DeviceContext } from '@common/device/types';
import { EmailAlreadyExistsException, WeakPasswordException } from '@common/exceptions';
import { MailService } from '@common/mail/mail.service';

import { RegisterDto } from './dto';
import { RegisterOutput } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly authCredentialsService: AuthCredentialsService,
    private readonly emailTokenService: EmailTokenService,
    private readonly sessionService: SessionService,
    private readonly passwordService: PasswordService,
    private readonly mailService: MailService,
  ) {}

  async register(dto: RegisterDto, deviceContext: DeviceContext): Promise<RegisterOutput> {
    const emailExists = await this.userService.emailExists(dto.email);
    if (emailExists) throw new EmailAlreadyExistsException();

    const isPasswordStrong = this.passwordService.isStrong(dto.password);
    if (!isPasswordStrong) throw new WeakPasswordException();

    const passwordHash = await this.passwordService.hash(dto.password);

    const user = await this.prisma.$transaction(async (tx) => {
      const userInput: CreateUserInput = {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        locale: dto.locale,
        timezone: dto.timezone,
        registrationSource: RegistrationSource.EMAIL,
      };

      const createdUser = await this.userService.create(userInput, tx);
      await this.authCredentialsService.create(createdUser.id, passwordHash, tx);

      return createdUser;
    });

    await this.userService.handleSuccessfulLogin(user.id);

    const { rawToken } = await this.emailTokenService.createEmailVerificationToken(
      user.id,
      user.email,
    );

    await this.mailService.sendVerificationEmail(user.email, user.firstName, rawToken);

    const sessionId = this.sessionService.generateSessionId();
    const accessTokenPayload: AccessTokenPayload = {
      sub: user.id,
      sid: sessionId,
      email: user.email,
    };

    const { accessToken, refreshToken, session } = await this.sessionService.create(
      { ...deviceContext, userId: user.id, id: sessionId },
      accessTokenPayload,
    );
    const refreshTokenExpiresAt = session.expiresAt;
    const userResponse = toUserResponseDto(user);

    return { user: userResponse, accessToken, refreshToken, refreshTokenExpiresAt };
  }

  async resendVerificationEmail(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);

    if (!user) return;
    if (user.emailVerified) return;

    const { rawToken } = await this.emailTokenService.resendEmailVerificationToken(
      user.id,
      user.email,
    );

    await this.mailService.sendVerificationEmail(user.email, user.firstName, rawToken);
  }
}
