import { Injectable } from '@nestjs/common';

import { Session } from '@prisma/client';

import { UserService } from '@modules/user/user.service';

import { SessionExpiredException, SessionNotFoundException } from '@common/exceptions';

import { SessionRepository } from '../session.repository';
import {
  AccessTokenPayload,
  CreateSessionInput,
  RefreshTokenResponse,
  SessionResponse,
} from '../types';

import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly jwtTokenService: JwtTokenService,
    private readonly userService: UserService,
  ) {}

  async create(
    input: Omit<CreateSessionInput, 'refreshTokenHash' | 'expiresAt'>,
    jwtPayload: AccessTokenPayload,
  ): Promise<SessionResponse> {
    const refreshToken = this.jwtTokenService.generateRefreshToken({
      sub: jwtPayload.sub,
      sid: jwtPayload.sid,
    });

    const refreshTokenHash = this.jwtTokenService.hashRefreshToken(refreshToken);
    const expiresAt = this.jwtTokenService.getRefreshTokenExpiresAt();

    const session = await this.sessionRepository.create({
      ...input,
      refreshTokenHash,
      expiresAt,
    });

    const accessToken = this.jwtTokenService.generateAccessToken(jwtPayload);

    return { session, accessToken, refreshToken };
  }

  async getById(id: string): Promise<Session> {
    const session = await this.sessionRepository.findById(id);
    if (!session) throw new SessionNotFoundException();
    return session;
  }

  async findAllActiveByUserId(userId: string): Promise<Session[]> {
    return this.sessionRepository.findAllActiveByUserId(userId);
  }

  async refresh(rawRefreshToken: string): Promise<RefreshTokenResponse> {
    const payload = this.jwtTokenService.verifyRefreshToken(rawRefreshToken);

    const refreshTokenHash = this.jwtTokenService.hashRefreshToken(rawRefreshToken);
    const session = await this.sessionRepository.findActiveByTokenHash(refreshTokenHash);

    if (!session) throw new SessionNotFoundException();

    const now = new Date();
    const isExpired = now > session.expiresAt;
    if (isExpired) throw new SessionExpiredException();

    const user = await this.userService.getById(payload.sub);

    const newRefreshToken = this.jwtTokenService.generateRefreshToken({
      sub: payload.sub,
      sid: payload.sid,
    });

    const newRefreshTokenHash = this.jwtTokenService.hashRefreshToken(newRefreshToken);
    const newExpiresAt = this.jwtTokenService.getRefreshTokenExpiresAt();

    await this.sessionRepository.updateRefreshToken(session.id, {
      refreshTokenHash: newRefreshTokenHash,
      expiresAt: newExpiresAt,
    });

    const accessToken = this.jwtTokenService.generateAccessToken({
      sub: payload.sub,
      sid: payload.sid,
      email: user.email,
    });

    return { accessToken, refreshToken: newRefreshToken };
  }

  async updateLastActivity(sessionId: string): Promise<void> {
    return this.sessionRepository.updateLastActivity(sessionId);
  }

  async revoke(sessionId: string): Promise<void> {
    return this.sessionRepository.revoke(sessionId);
  }

  async revokeAll(userId: string): Promise<number> {
    return this.sessionRepository.revokeAll(userId);
  }
}
